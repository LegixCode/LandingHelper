<script setup>
import { computed } from "vue";

const props = defineProps({
    color: String,
    bg: {
        type: Boolean,
        default: false,
    },
    submit: {
        type: Boolean,
        default: false,
    },
    disabled: Boolean,
});

const background = computed(() => {
    switch (props.color) {
        case "green":
            return "text-white bg-green-600 enabled:hover:bg-green-700";
        case "gray":
            return "text-white bg-slate-600/75 enabled:hover:bg-slate-800/75";
        case "purple":
            return "text-white bg-purple-600 enabled:hover:bg-purple-700";
        case "red":
            return "text-white bg-red-600 enabled:hover:bg-red-700";
        case "blue":
            return "text-white bg-blue-600 enabled:hover:bg-blue-700";
        case "yellow":
            return "text-white bg-yellow-600 enabled:hover:bg-yellow-700";
    }
});
const text = computed(() => {
    switch (props.color) {
        case "green":
            return "text-green-600 enabled:hover:text-green-700";
        case "gray":
            return "text-slate-600/75 enabled:hover:text-slate-800/75";
        case "purple":
            return "text-purple-600 enabled:hover:text-purple-800";
        case "red":
            return "text-red-600 enabled:hover:text-red-800";
        case "blue":
            return "text-blue-600 enabled:hover:text-blue-800";
        case "yellow":
            return "text-yellow-600 enabled:hover:text-yellow-800";
    }
});
</script>
<template>
    <button
        :type="submit ? 'submit' : 'button'"
        class="h-9 px-4 py-1 rounded-lg text-sm font-bold cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed transition-colors"
        :class="[bg ? background : text]"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>
