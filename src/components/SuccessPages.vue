<script setup lang="ts">
import BaseButton from "./ui/BaseButton.vue";
import BaseToggle from "./ui/BaseToggle.vue";
import SearchSelect from "./ui/SearchSelect.vue";
import languages from "@/classes/languages";
import saveFile from "@/classes/saveFile.ts";
import { useSuccessPagesStore } from "@/store/success_pages";

const store = useSuccessPagesStore();

function loadPage() {
    saveFile("success.php", store.getCompletedTemplate());
}
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="rounded-lg shadow-card border border-slate-100 p-6 col-span-2">
            <div class="flex gap-3 pb-6 items-center">
                <div class="font-bold">success.php</div>
                <BaseButton color="purple" v-clipboard="store.getCompletedTemplate" class="ml-auto">Скопировать</BaseButton>
                <BaseButton color="green" @click="loadPage">Скачать</BaseButton>
            </div>
            <div>
                <iframe
                    :srcdoc="store.current_page_template.replace('{pixel}', '')"
                    class="min-w-full min-h-[600px]"
                ></iframe>
            </div>
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
                <div class="flex items-center gap-3 text-sm text-slate-800">
                    <BaseToggle v-model="store.config.fb_pixel" /> Добавить FB pixel
                </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-6">
                <div
                    class="shadow-card border-2 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-110"
                    v-for="page of store.available_pages"
                    :class="[page.name == store.config.name ? 'border-teal-500' : 'border-white']"
                    @click="store.config.name = page.name"
                >
                    <img :src="page.preview" class="w-full" />
                </div>
            </div>
        </div>
    </div>
</template>
