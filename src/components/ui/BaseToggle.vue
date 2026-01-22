<script setup lang="ts">
const modelValue = defineModel<boolean>({ required: true });
</script>

<template>
    <label class="relative cursor-pointer">
        <input v-model="modelValue" class="hidden peer" type="checkbox" />
        <span class="block w-10 h-3 bg-gray-200 rounded-full shadow-inner"></span>
        <span
            class="absolute w-5 h-5 -top-1 bg-white rounded-full shadow-sm inset-y-0 transition-all peer-checked:translate-x-5 peer-checked:bg-[#34D399]"
        ></span>
    </label>
</template>
