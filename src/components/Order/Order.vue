<script setup>
import Select from "@/components/ui/Select.vue";
import Button from "@/components/ui/Button.vue";
import Toggle from "@/components/ui/Toggle.vue";
import saveFile from "@/classes/saveFile.js";
import PPParams from "./PPParams.vue";
import PPSubs from "./PPSubs.vue";
import { usePartnersStore } from "@/store/partners";

const store = usePartnersStore();

</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="col-span-2">
            <div class="rounded-lg shadow-card border border-slate-100" v-if="store.partner">
                <div class="flex gap-3 px-6 pt-6 pb-3 items-center">
                    <div class="font-bold">order.php</div>
                    <Button
                        color="purple"
                        v-clipboard="() => store.formated_order_file"
                        class="ml-auto"
                        :disabled="!store.formated_order_file"
                        >Скопировать</Button
                    >
                    <Button
                        color="green"
                        @click="saveFile('order.php', store.formated_order_file)"
                        :disabled="!store.formated_order_file"
                        >Скачать</Button
                    >
                </div>
                <div class="max-h-[450px] overflow-y-scroll px-6 pt-3 pb-6">
                    <pre class="text-xs"> {{ store.formated_order_file }}</pre>
                </div>
            </div>
        </div>
        <div class="order-first lg:order-0 self-start">
            <div class="flex flex-col">
                <Select label="ПП" v-model="store.config.name">
                    <option v-for="(label, name) of store.partners" :key="name" :value="name">{{ label }}</option>
                </Select>
                <PPParams />
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-800">
                <Toggle v-model="store.config.write_log" /> Сохранять лог лидов
            </div>
            <PPSubs />
        </div>
    </div>
</template>
