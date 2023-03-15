<script setup>
defineEmits(["update:modelValue", "clear"]);
defineProps({
    modelValue: {},
    label: String,
    type: {
        type: String,
        default: "text",
    },
});
</script>

<template>
    <div class="my-2">
        <div class="relative border rounded-lg h-11 border-slate-400/[0.32] focus-within:border-slate-400/[0.32]">
            <input
                :type="type"
                placeholder=" "
                class="py-[13px] px-4 text-sm leading-none appearance-none focus:outline-none bg-transparent w-full"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <label
                class="absolute top-0 left-0 cursor-text bg-white mt-[14px] mx-[16px] z-[0] duration-200 origin-0 text-sm leading-none truncate overflow-hidden max-w-[85%] pointer-events-none text-slate-400"
            >
                {{ label }}
            </label>
        </div>
    </div>
</template>
