<script setup>
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import { onMounted, reactive, watch } from "vue";
import { getListSubs } from "@/classes/listSubs";
import Button from "./ui/Button.vue";
import Input from "./ui/Input.vue";

const subs = reactive({});
getListSubs().forEach((s) => (subs[s] = ""));
watch(
    () => subs,
    () => {
        localStorage.setItem("subs", JSON.stringify(subs));
    },
    {
        deep: true,
    }
);
onMounted(() => {
    var local_values = {};
    if (localStorage.getItem("subs"))
        try {
            local_values = JSON.parse(localStorage.getItem("subs"));
        } catch {}
    Object.keys(subs).forEach((key) => {
        subs[key] = local_values[key] ?? "";
    });
});

function copy_form_params() {
    toClipboard(
        Object.keys(subs)
            .filter((sub) => subs[sub].length > 0)
            .map((sub) => `<input type="hidden" name="${sub}" value="${subs[sub]}" />`)
            .join("\n")
    );
}
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="col-span-2 rounded-lg shadow-card border border-slate-100 p-6">
            <div class="flex gap-3 pb-6 items-center">
                <div class="font-bold">Параметры формы</div>
                <Button color="purple" @click="copy_form_params" class="ml-auto">Скопировать</Button>
            </div>
            <code class="text-xs">
                <p v-for="s of getListSubs()">&ltinput type="hidden" name="{{ s }}" value="{{ subs[s] }}" /&gt</p>
            </code>
        </div>
        <div class="order-first lg:order-none grid grid-cols-2 gap-x-6">
            <Input v-for="s of getListSubs()" :label="s" v-model="subs[s]" />
        </div>
    </div>
</template>
