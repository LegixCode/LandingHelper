<script setup>
defineEmits(["update:modelValue"]);
defineProps({
    modelValue: {},
    label: String,
});
</script>
<template>
    <div class="my-2">
        <div class="relative border border-slate-400/[0.32] rounded-lg focus-within:border-slate-400/[0.32] h-11">
            <select
                placeholder=" "
                class="py-[14px] px-4 text-sm leading-none appearance-none focus:outline-none bg-transparent w-full"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            >
                <slot />
            </select>
            <label
                class="absolute top-0 left-0 cursor-text bg-white mx-[16px] z-[0] duration-200 origin-0 leading-none truncate overflow-hidden max-w-[85%] pointer-events-none text-slate-400 transform text-[12px] -translate-y-[6px] my-0"
            >
                {{ label }}
            </label>
        </div>
    </div>
</template>
