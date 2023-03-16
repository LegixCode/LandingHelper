<script setup>
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import { onMounted, reactive, watch, ref, computed } from "vue";
import { getFormPreviews, form_names, getForm, getAvailableLanguages } from "@/classes/forms";
import { languages } from "@/classes/languages";
import Button from "./ui/Button.vue";
import Select from "./ui/Select.vue";
import Toggle from "./ui/Toggle.vue";
import Input from "./ui/Input.vue";

const available_languages = getAvailableLanguages().sort((a, b) => (languages[a] > languages[b] ? 1 : -1));

const config = reactive({
    name: form_names[0],
    language: "en",
    old_price: "$78",
    new_price: "$39",
});
onMounted(() => {
    var local_values = {};
    if (localStorage.getItem("form_config"))
        try {
            local_values = JSON.parse(localStorage.getItem("form_config"));
            Object.keys(config).forEach((key) => {
                if (local_values[key] !== undefined) config[key] = local_values[key] ?? "";
            });
        } catch {}
});
watch(
    () => config,
    () => {
        localStorage.setItem("form_config", JSON.stringify(config));
    },
    {
        deep: true,
    }
);

const form = computed(() => {
    return getForm(config.name);
});

const previews = computed(() => {
    return getFormPreviews(config.language);
});
watch(
    () => previews.value,
    () => {
        if (Object.keys(previews.value).indexOf(config.name) === -1) config.name = Object.keys(previews.value)[0];
    }
);

const template = computed(() => {
    return form.value.template.replaceAll(/{(\w)+}/g, (match) => {
        if (match == "{old_price}") return config.old_price;
        if (match == "{new_price}") return config.new_price;
        if (match == "{form_inputs}") return match;
        if (match == "{image}") return "previews/product.jpg";
        var _match = match.substring(1, match.length - 1);
        if (form.value.translates[config.language] !== undefined)
            return form.value.translates[config.language][_match] ?? "";
        return match;
    });
});

const iframe_code = computed(() => {
    return `
            <style>${form.value.style}</style>
            ${template.value}
    `;
});

function copy_style() {
    toClipboard(`<style>${form.value.style}</style>`);
}
function copy_form() {
    var subs = "";
    if (localStorage.getItem("subs"))
        try {
            var local_values = JSON.parse(localStorage.getItem("subs"));
            subs = Object.keys(local_values)
                .filter((sub) => local_values[sub].length > 0)
                .map((sub) => `<input type="hidden" name="${sub}" value="${local_values[sub]}" />`)
                .join("\n");
        } catch {}
    toClipboard(template.value.replace("{form_inputs}", subs));
}
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="rounded-lg shadow-card border border-slate-100 p-6 col-span-2">
            <div class="flex gap-3 pb-6 items-center">
                <div class="font-bold">Форма</div>
                <Button color="purple" @click="copy_style" class="ml-auto">Скопировать стили</Button>
                <Button color="purple" @click="copy_form">Скопировать форму</Button>
            </div>
            <div v-html="iframe_code.replace('{form_inputs}', '')"></div>
        </div>
        <div class="order-first lg:order-none">
            <div class="flex flex-col">
                <Select label="Язык" v-model="config.language">
                    <option :value="lang" v-for="lang of available_languages">{{ languages[lang] }}</option>
                </Select>
                <Input label="Старая цена" v-model="config.old_price" />
                <Input label="Новая цена" v-model="config.new_price" />
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
