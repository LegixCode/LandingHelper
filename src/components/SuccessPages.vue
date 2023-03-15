<script setup>
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import { onMounted, reactive, watch, ref, computed } from "vue";
import {
    getSuccessPagePreviews,
    success_page_names,
    getSuccessPage,
    getAvailableLanguages,
} from "@/classes/successPages";
import { languages } from "@/classes/languages";
import Button from "./ui/Button.vue";
import Select from "./ui/Select.vue";
import Toggle from "./ui/Toggle.vue";

const load_tag = ref(null);
const available_languages = getAvailableLanguages().sort((a, b) => languages[a] > languages[b] ? 1 : -1);

const config = reactive({
    name: success_page_names[0],
    language: "en",
    fb_pixel: true,
});
onMounted(() => {
    var local_values = {};
    if (localStorage.getItem("success_page_config"))
        try {
            local_values = JSON.parse(localStorage.getItem("success_page_config"));
            Object.keys(config).forEach((key) => {
                if (local_values[key] !== undefined) config[key] = local_values[key] ?? "";
            });
        } catch {}
});
watch(
    () => config,
    () => {
        localStorage.setItem("success_page_config", JSON.stringify(config));
    },
    {
        deep: true,
    }
);

const success_page = computed(() => {
    return getSuccessPage(config.name);
});

const previews = computed(() => {
    return getSuccessPagePreviews(config.language);
});
watch(
    () => previews.value,
    () => {
        if (Object.keys(previews.value).indexOf(config.name) === -1) config.name = Object.keys(previews.value)[0];
    }
);

const template = computed(() => {
    return success_page.value.template.replaceAll(/{(\w)+}/g, (match) => {
        if (["{pixel}", "{name}", "{phone}"].indexOf(match) !== -1) return match;
        var _match = match.substring(1, match.length - 1);
        if (success_page.value.translates[config.language] !== undefined)
            return success_page.value.translates[config.language][_match];
        return match;
    });
});

const completed_template = ref("");
function setCompletedTemplate() {
    completed_template.value = template.value.replaceAll(/{(\w)+}/g, (match) => {
        if (match == "{pixel}")
            if (!config.fb_pixel) return "";
            else
                return `
            <!-- Facebook Pixel Code -->
            \<script>
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '<?= $_REQUEST["pixel"]; ?>');
            fbq('track', 'Lead');
            \<\/script>
            <img height="1" width="1" src="https://www.facebook.com/tr?id=<?= $_REQUEST['pixel']; ?>&ev=Lead&noscript=1" />
            <!-- End Facebook Pixel Code -->
        `;
        if (match == "{name}") return '<?= $_REQUEST["name"]; ?>';
        if (match == "{phone}") return '<?= $_REQUEST["phone"]; ?>';
        return match;
    });
}

function copy_page() {
    setCompletedTemplate();
    toClipboard(completed_template.value);
}
function load_page() {
    setCompletedTemplate();
    setTimeout(() => load_tag.value.click(), 1);
}
</script>
<template>
    <a
        :href="'data:attachment/text,' + encodeURIComponent(completed_template)"
        target="_blank"
        download="success.php"
        ref="load_tag"
    ></a>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="rounded-lg shadow-card border border-slate-100 p-6 col-span-2">
            <div class="flex gap-3 pb-6 items-center">
                <div class="font-bold">success.php</div>
                <Button color="purple" @click="copy_page" class="ml-auto">Скопировать</Button>
                <Button color="green" @click="load_page">Скачать</Button>
            </div>
            <div>
                <iframe :srcdoc="template.replace('{pixel}', '')" class="min-w-full min-h-[600px]"></iframe>
            </div>
        </div>
        <div class="order-first lg:order-none">
            <div class="flex flex-col">
                <Select label="Язык" v-model="config.language">
                    <option :value="lang" v-for="lang of available_languages">{{ languages[lang] }}</option>
                </Select>
                <div class="flex items-center gap-3 text-sm text-slate-800">
                    <Toggle v-model="config.fb_pixel" /> Добавить FB pixel
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-6">
                <div
                    class="shadow-card border-2 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-110"
                    v-for="(preview, name) of previews"
                    :class="[name == config.name ? 'border-teal-500' : 'border-white']"
                    @click="config.name = name"
                >
                    <img :src="preview" class="w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
