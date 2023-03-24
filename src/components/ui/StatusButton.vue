<script setup>
import { ref, watch } from "vue";
import Button from "./Button.vue";

const props = defineProps({
    status: String,
    defaultText: String,
    defaultColor: String,
});

const color = ref(props.defaultColor);
const text = ref(props.defaultText);

watch(() => props.status, handle);
function handle() {
    console.log(props.status);
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
    <Button :color="color">{{ text }}</Button>
</template>
