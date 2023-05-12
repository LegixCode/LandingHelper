<script setup>
import { ref } from "vue";
import { getListSubs } from "@/classes/listSubs";
import Button from "@/Components/ui/Button.vue";
import Select from "@/Components/ui/Select.vue";
import { usePartnersStore } from "@/store/partners";

const showed = ref(false);

</script>
<template>
    <div class="flex items-center">
        <Button color="gray" class="mx-auto" @click="showed = !showed">
            {{ showed ? "Скрыть" : "Показать" }} настройки меток
        </Button>
    </div>
    <div class="grid grid-cols-2 gap-x-6" v-if="showed">
        <Select
            v-for="(value, label) of usePartnersStore().partner_subs.value"
            :label="label"
            v-model="usePartnersStore().partner_subs.value[label]"
        >
            <option></option>
            <option v-for="s of getListSubs()">{{ s }}</option>
        </Select>
    </div>
</template>
