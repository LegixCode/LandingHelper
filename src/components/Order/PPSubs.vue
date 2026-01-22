<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import { getListSubs } from "@/classes/listSubs.ts";
import { ref } from "vue";
import { usePartnersStore } from "@/store/partners";

const showed = ref(false);
</script>
<template>
    <div class="flex items-center">
        <BaseButton color="gray" class="mx-auto" @click="showed = !showed">
            {{ showed ? "Скрыть" : "Показать" }} настройки меток
        </BaseButton>
    </div>
    <div class="grid grid-cols-2 gap-x-6" v-if="showed">
        <BaseSelect
            v-for="(value, label) of usePartnersStore().partner_subs.value"
            :label="label"
            v-model="usePartnersStore().partner_subs.value[label]"
        >
            <option></option>
            <option v-for="s of getListSubs()">{{ s }}</option>
        </BaseSelect>
    </div>
</template>
