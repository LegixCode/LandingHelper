<script setup>
import { getPPProps } from "@/classes/ppconfigs.js";
import { onMounted, ref, watch } from "vue";
import Input from "./ui/Input.vue";

const emit = defineEmits(["update:prop_values"]);
const props = defineProps({
    pp: String,
    prop_values: Object,
});

const prop_keys = ref([]);

function initPP() {
    prop_keys.value = getPPProps(props.pp);
    var prop_values = {};
    var local_values = {};
    if (localStorage.getItem(props.pp + "_props"))
        try {
            local_values = JSON.parse(localStorage.getItem(props.pp + "_props"));
        } catch {}
    Object.keys(prop_keys.value).forEach((key) => {
        prop_values[key] = local_values[key] ?? "";
    });
    emit("update:prop_values", prop_values);
}

onMounted(() => {
    initPP();
});

watch(() => props.pp, initPP);
watch(
    () => props.prop_values,
    () => {
        localStorage.setItem(props.pp + "_props", JSON.stringify(props.prop_values));
    },
    {
        deep: true,
    }
);
</script>
<template>
    <div class="flex flex-col">
        <Input v-for="(label, key) of prop_keys" :label="label" :key="key" v-model="prop_values[key]" />
    </div>
</template>
