<script setup lang="ts">
const modelValue = defineModel<string>({ required: true });

defineEmits<{
    clear: [];
}>();

withDefaults(
    defineProps<{
        label: string | number;
        type?: "text" | "number";
    }>(),
    {
        type: "text",
    }
);
</script>

<template>
    <div class="my-2">
        <div class="relative border rounded-lg h-11 border-slate-400/32 focus-within:border-slate-400/32">
            <input
                v-model="modelValue"
                :type="type"
                placeholder=" "
                class="py-[13px] px-4 text-sm leading-none appearance-none focus:outline-hidden bg-transparent w-full"
            />
            <label
                class="absolute top-0 left-0 cursor-text bg-white mt-[14px] mx-4 z-0 duration-200 origin-0 text-sm leading-none truncate overflow-hidden max-w-[85%] pointer-events-none text-slate-400"
            >
                {{ label }}
            </label>
        </div>
    </div>
</template>
