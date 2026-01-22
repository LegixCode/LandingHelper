<script setup>
import { computed } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: {},
});
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <label class="relative cursor-pointer">
        <input class="hidden peer" type="checkbox" v-model="model" />
        <div class="w-10 h-3 bg-gray-200 rounded-full shadow-inner"></div>
        <div
            class="absolute w-5 h-5 -top-1 bg-white rounded-full shadow-sm inset-y-0 transition-all peer-checked:translate-x-5 peer-checked:bg-[#34D399]"
        ></div>
    </label>
</template>
