<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import type { TColor } from "@/types/Color.ts";
import { ref, watch } from "vue";

const props = defineProps<{
    status: "processing" | "error" | "success" | null;
    defaultText: string;
    defaultColor: TColor;
}>();

const color = ref<TColor>(props.defaultColor);
const text = ref(props.defaultText);

watch(() => props.status, handle);
function handle() {
    switch (props.status) {
        case "processing":
            color.value = "gray";
            text.value = "Компилирую";
            break;
        case "error":
            color.value = "red";
            text.value = "Ошибка";
            break;
        case "success":
            color.value = "green";
            text.value = "Готово";
            break;
        default:
            color.value = props.defaultColor;
            text.value = props.defaultText;
            break;
    }
}
</script>
<template>
    <BaseButton :color="color">{{ text }}</BaseButton>
</template>
