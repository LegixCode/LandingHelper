<script setup>
import { getPPSubs } from "@/classes/ppconfigs.js";
import { onMounted, watch, ref } from "vue";
import { getListSubs } from "@/classes/listSubs";
import Button from "./ui/Button.vue";
import Select from "./ui/Select.vue";

const emit = defineEmits(["update:pp_subs"]);

const props = defineProps({
    pp: String,
    pp_subs: Object,
});

const showed = ref(false);

function initPP() {
    var pp_subs = { ...getPPSubs(props.pp) };
    var local_values = {};
    if (localStorage.getItem(props.pp + "_subs"))
        try {
            local_values = JSON.parse(localStorage.getItem(props.pp + "_subs"));
        } catch {}
    Object.keys(pp_subs).forEach((key) => {
        if (local_values[key] !== undefined) pp_subs[key] = local_values[key] ?? "";
    });
    emit("update:pp_subs", pp_subs);
}

onMounted(initPP);

watch(() => props.pp, initPP);
watch(
    () => props.pp_subs,
    () => {
        localStorage.setItem(props.pp + "_subs", JSON.stringify(props.pp_subs));
    },
    {
        deep: true,
    }
);
</script>
<template>
    <div class="flex items-center">
        <Button color="gray" class="mx-auto" @click="showed = !showed">
            {{ showed ? "Скрыть" : "Показать" }} настройки меток
        </Button>
    </div>
    <div class="grid grid-cols-2 gap-x-6" v-if="showed">
        <Select v-for="(value, sub) of pp_subs" :label="sub" v-model="pp_subs[sub]">
            <option></option>
            <option v-for="s of getListSubs()">{{ s }}</option>
        </Select>
    </div>
</template>
