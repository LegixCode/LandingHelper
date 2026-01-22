<script setup>
import { computed } from "vue";
import { countryNumbers } from "@/classes/countryNumbers";
import languages from "@/classes/languages";
import countries from "@/classes/countries";
import basic_phrases from "@/classes/forms/basic_phrases";
import { useFormSubsStore } from "@/store/form_subs";
import { useFormsStore } from "@/store/forms";
import Button from "@/components/ui/Button.vue";
import Toggle from "@/components/ui/Toggle.vue";
import Input from "@/components/ui/Input.vue";
import SearchSelect from "@/components/ui/SearchSelect.vue";

const store = useFormsStore();

const template = computed(() => {
    return store.current_form.template.replaceAll(/{(\w)+}/g, (match) => {
        if (match == "{old_price_value}") return store.config.old_price;
        if (match == "{new_price_value}") return store.config.new_price;
        if (match == "{form_inputs}") return match;
        if (match == "{image}") return "previews/product.jpg";
        if (match == "{phone_code}") {
            if (!store.config.show_phone_code) return "";
            return "+" + countryNumbers[store.config.country_alpha2].code;
        }
        var _match = match.substring(1, match.length - 1);
        if (store.current_form.translates && store.current_form.translates[store.config.language] !== undefined)
            return store.current_form.translates[store.config.language][_match] ?? "";
        if (basic_phrases[store.config.language] !== undefined)
            return basic_phrases[store.config.language][_match] ?? "";
        return match;
    });
});

const iframe_code = computed(() => {
    return `
            <style>${store.current_form.style}</style>
            ${template.value}
    `;
});

function copy_style() {
    toClipboard(`<style>${store.current_form.style}</style>`);
}
function copy_form() {
    toClipboard(template.value.replace("{form_inputs}", useFormSubsStore().getInputs()));
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
            <div v-if="store.current_form.scripts" class="text-[13px] text-slate-600 text-center -mt-6 pb-6">
                Выбранная форма требует обязательной установки следующих скриптов:
                <b>{{ store.current_form.scripts.map((s) => s + ".js").join(",") }}</b>
            </div>
            <div v-html="iframe_code.replace('{form_inputs}', '')"></div>
        </div>
        <div class="order-first lg:order-0">
            <div class="flex flex-col">
                <SearchSelect
                    label="Язык"
                    v-model="store.config.language"
                    :options="
                        store.languages.map((lang) => ({
                            value: lang,
                            label: languages[lang],
                        }))
                    "
                    :search-by="(item) => item.label + ' ' + item.value"
                />
                <Input label="Старая цена" v-model="store.config.old_price" />
                <Input label="Новая цена" v-model="store.config.new_price" />
                <div class="flex items-center gap-3 text-sm text-slate-800 my-3">
                    <Toggle v-model="store.config.show_phone_code" /> Добавить код страны
                </div>
                <SearchSelect
                    label="Страна"
                    v-model="store.config.country_alpha2"
                    v-if="store.config.show_phone_code"
                    :options="
                        Object.keys(countryNumbers).map((alpha2) => ({
                            value: alpha2,
                            label: countries[alpha2],
                        }))
                    "
                    :search-by="(item) => item.label + ' ' + item.value"
                />
            </div>
            <div class="grid grid-cols-2 gap-6 mt-6">
                <div
                    class="shadow-card border-2 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-110"
                    v-for="form of store.available_forms"
                    :class="[form.name == store.config.name ? 'border-teal-500' : 'border-white']"
                    @click="store.config.name = form.name"
                >
                    <img :src="form.preview" class="w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
