<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseToggle from "@/components/ui/BaseToggle.vue";
import SearchSelect from "@/components/ui/SearchSelect.vue";
import basic_phrases from "@/classes/forms/basic_phrases";
import countries from "@/classes/countries.ts";
import languages from "@/classes/languages.ts";
import { computed } from "vue";
import { countryNumbers } from "@/classes/countryNumbers.ts";
import { useFormSubsStore } from "@/store/form_subs";
import { useFormsStore } from "@/store/forms";

const store = useFormsStore();

const template = computed(() => {
    return store.currentForm.template.replaceAll(/{(\w)+}/g, (match) => {
        if (match == "{old_price_value}") return store.config.old_price;
        if (match == "{new_price_value}") return store.config.new_price;
        if (match == "{form_inputs}") return match;
        if (match == "{image}") return "previews/product.jpg";
        if (match == "{phone_code}") {
            if (!store.config.show_phone_code) return "";
            return "+" + countryNumbers[store.config.country_alpha2].code;
        }
        var _match = match.substring(1, match.length - 1);
        if (store.currentForm.translates && store.currentForm.translates[store.config.language] !== undefined)
            return store.currentForm.translates[store.config.language][_match] ?? "";
        if (basic_phrases[store.config.language] !== undefined)
            return basic_phrases[store.config.language][_match] ?? "";
        return match;
    });
});

const iframe_code = computed(() => {
    return `
            <style>${store.currentForm.style}</style>
            ${template.value}
    `;
});

function copy_style() {
    window.toClipboard(`<style>${store.currentForm.style}</style>`);
}
function copy_form() {
    window.toClipboard(template.value.replace("{form_inputs}", useFormSubsStore().getInputs()));
}
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="rounded-lg shadow-card border border-slate-100 p-6 col-span-2">
            <div class="flex gap-3 pb-6 items-center">
                <div class="font-bold">Форма</div>
                <BaseButton color="purple" @click="copy_style" class="ml-auto">Скопировать стили</BaseButton>
                <BaseButton color="purple" @click="copy_form">Скопировать форму</BaseButton>
            </div>
            <div v-if="store.currentForm.scripts" class="text-[13px] text-slate-600 text-center -mt-6 pb-6">
                Выбранная форма требует обязательной установки следующих скриптов:
                <b>{{ store.currentForm.scripts.map((s) => s + ".js").join(",") }}</b>
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
                <BaseInput label="Старая цена" v-model="store.config.old_price" />
                <BaseInput label="Новая цена" v-model="store.config.new_price" />
                <div class="flex items-center gap-3 text-sm text-slate-800 my-3">
                    <BaseToggle v-model="store.config.show_phone_code" /> Добавить код страны
                </div>
                <SearchSelect
                    v-if="store.config.show_phone_code"
                    v-model="store.config.country_alpha2"
                    label="Страна"
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
                    v-for="form of store.availableForms"
                    :class="[form.name == store.config.name ? 'border-teal-500' : 'border-white']"
                    @click="store.config.name = form.name"
                >
                    <img :src="form.preview" alt="preview" class="w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
