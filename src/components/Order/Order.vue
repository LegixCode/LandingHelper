<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import BaseToggle from "@/components/ui/BaseToggle.vue";
import PPParams from "./PPParams.vue";
import PPSubs from "./PPSubs.vue";
import saveFile from "@/classes/saveFile.ts";
import { usePartnersStore } from "@/store/partners";

const store = usePartnersStore();
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="col-span-2">
            <div class="rounded-lg shadow-card border border-slate-100" v-if="store.partner">
                <div class="flex gap-3 px-6 pt-6 pb-3 items-center">
                    <div class="font-bold">order.php</div>
                    <BaseButton
                        color="purple"
                        v-clipboard="() => store.formated_order_file"
                        class="ml-auto"
                        :disabled="!store.formated_order_file"
                        >Скопировать</BaseButton
                    >
                    <BaseButton
                        color="green"
                        @click="saveFile('order.php', store.formated_order_file)"
                        :disabled="!store.formated_order_file"
                        >Скачать</BaseButton
                    >
                </div>
                <div class="max-h-[450px] overflow-y-scroll px-6 pt-3 pb-6">
                    <pre class="text-xs"> {{ store.formated_order_file }}</pre>
                </div>
            </div>
        </div>
        <div class="order-first lg:order-0 self-start">
            <div class="flex flex-col">
                <BaseSelect label="ПП" v-model="store.config.name">
                    <option v-for="(label, name) of store.partners" :key="name" :value="name">{{ label }}</option>
                </BaseSelect>
                <PPParams />
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-800">
                <BaseToggle v-model="store.config.write_log" /> Сохранять лог лидов
            </div>
            <PPSubs />
        </div>
    </div>
</template>
