<script setup>
import { computed } from "vue";
import { countryNumbers } from "@/classes/countryNumbers";
import languages from "@/classes/languages";
import countries from "@/classes/countries";
import { useFormSubsStore } from "@/store/form_subs";
import { useFormsStore } from "@/store/forms";
import Button from "./ui/Button.vue";
import Select from "./ui/Select.vue";
import Toggle from "./ui/Toggle.vue";
import Input from "./ui/Input.vue";

const store = useFormsStore();

const template = computed(() => {
    return store.current_form.template.replaceAll(/{(\w)+}/g, (match) => {
        if (match == "{old_price}") return store.config.old_price;
        if (match == "{new_price}") return store.config.new_price;
        if (match == "{form_inputs}") return match;
        if (match == "{image}") return "previews/product.jpg";
        if (match == "{phone_code}") {
            if (!store.config.show_phone_code) return "";
            return "+" + countryNumbers[store.config.country_alpha2].code;
        }
        var _match = match.substring(1, match.length - 1);
        if (store.current_form.translates[store.config.language] !== undefined)
            return store.current_form.translates[store.config.language][_match] ?? "";
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
            <div v-html="iframe_code.replace('{form_inputs}', '')"></div>
        </div>
        <div class="order-first lg:order-none">
            <div class="flex flex-col">
                <Select label="Язык" v-model="store.config.language">
                    <option :value="lang" v-for="lang of store.languages">{{ languages[lang] }}</option>
                </Select>
                <Input label="Старая цена" v-model="store.config.old_price" />
                <Input label="Новая цена" v-model="store.config.new_price" />
                <div class="flex items-center gap-3 text-sm text-slate-800 my-3">
                    <Toggle v-model="store.config.show_phone_code" /> Добавить код страны
                </div>
                <Select label="Страна" v-model="store.config.country_alpha2" v-if="store.config.show_phone_code">
                    <option :value="country_alpha2" v-for="(country, country_alpha2) of countryNumbers">
                        {{ country_alpha2 }} - {{ countries[country_alpha2] }}
                    </option>
                </Select>
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
