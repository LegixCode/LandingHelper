<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import { storeToRefs } from "pinia";
import { useFormSubsStore } from "@/store/form_subs";

const { subs } = storeToRefs(useFormSubsStore());

function copy_form_params() {
    window.toClipboard(useFormSubsStore().getInputs());
}
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="col-span-2 rounded-lg shadow-card border border-slate-100 p-6">
            <div class="flex gap-3 pb-6 items-center">
                <div class="font-bold">Параметры формы</div>
                <BaseButton color="purple" @click="copy_form_params" class="ml-auto">Скопировать</BaseButton>
            </div>
            <code class="text-xs">
                <p v-for="(value, name) of subs">&ltinput type="hidden" name="{{ name }}" value="{{ value }}" /&gt</p>
            </code>
        </div>
        <div class="order-first lg:order-0 grid grid-cols-2 gap-x-6">
            <BaseInput v-for="(value, name) of subs" :label="name" v-model.trim="subs[name]" />
        </div>
    </div>
</template>
