<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";
import StatusButton from "@/components/ui/StatusButton.vue";
import saveFile from "@/classes/saveFile.ts";
import { ref, computed } from "vue";

var minify_example = ref(false);
var example = computed(() => {
    var min = minify_example.value ? ".min" : "";
    return "<" + 'script src="js/scroll_to_form' + min + '.js" form_id="helper_form">' + "<" + "/script>";
});

function save() {
    minify_example.value = false;

    window.toClipboard(
        import("@/classes/scripts/scroll_to_form.ts")
            .then((obj) => {
                saveFile("scroll_to_form.js", obj.scroll_to_form);
            })
            .then(() => example.value)
    );
}
var minify_status = ref<"processing" | "error" | null>(null);
function save_minify() {
    minify_example.value = true;
    minify_status.value = "processing";
    window.toClipboard(
        import("@/classes/scripts/scroll_to_form.ts")
            .then((obj) => {
                import("terser")
                    .then((terser) => {
                        terser
                            .minify(obj.scroll_to_form)
                            .then((result) => {
                                saveFile("scroll_to_form.min.js", result.code);
                                minify_status.value = "success";
                                setTimeout(() => (minify_status.value = null), 2000);
                            })
                            .catch(() => (minify_status.value = "error"));
                    })
                    .catch(() => (minify_status.value = "error"));
            })
            .then(() => example.value)
            .catch(() => (minify_status.value = "error"))
    );
}
</script>
<template>
    <div class="shadow-card rounded-lg p-6 space-y-3">
        <div class="flex items-center">
            <div class="font-bold">scroll_to_form.js</div>
            <BaseButton color="green" class="ml-auto" @click="save">Скачать</BaseButton>
            <StatusButton default-text=".min.js" default-color="green" :status="minify_status" @click="save_minify" />
        </div>
        <div class="text-[13px] text-slate-600 indent-8">
            Скрипт очищает атрибут <b>href</b> и удаляет <b>target</b> и <b>onclick</b> со всех тегов <b>&lt;a&gt;</b>.
            По нажатию на ссылку производится плавный скролл до формы. Если необходимо настроить иное место до которого
            будет прокручиваться страница, то к тегу <b>&lt;script&gt;</b> требуется добавить атрибут <b>form_id</b> в
            котором указать <b>id</b> элемента.
        </div>
        <div class="text-[13px] p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>{{ example }}</code>
            <div
                class="absolute right-0 inset-y-0 flex items-center group-hover:opacity-100 transition-opacity opacity-0"
            >
                <BaseButton v-clipboard="() => example" color="purple" class="bg-slate-200/90 rounded-xl">
                    Скопировать
                </BaseButton>
            </div>
        </div>
        <div class="text-[13px] text-slate-600">
            Добавьте класс <b>ignore-scroll</b> к ссылке, чтобы скрипт к ней не применился
        </div>
    </div>
</template>
