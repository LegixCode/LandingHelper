<script setup>
import Button from "@/components/ui/Button.vue";
import saveFile from "@/classes/saveFile.js";
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import StatusButton from "@/components/ui/StatusButton.vue";
import { ref } from "vue";

var example = "<" + 'script src="js/scroll_to_form.js" form_id="helper_form">' + "<" + "/script>";
function save() {
    import("@/classes/scripts/scroll_to_form.js").then((obj) => {
        saveFile("scroll_to_form.js", obj.scroll_to_form);
    });
}
var minify_status = ref(null);
function save_minify() {
    minify_status.value = "processing";
    import("@/classes/scripts/scroll_to_form.js")
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
        .catch(() => (minify_status.value = "error"));
}
</script>
<template>
    <div class="shadow-card p-6 space-y-3">
        <div class="flex items-center">
            <div class="font-bold">scroll_to_form.js</div>
            <Button color="green" @click="save" class="ml-auto">Скачать</Button>
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
                <Button color="purple" @click="toClipboard(example)" class="bg-slate-200/90 rounded-xl">
                    Скопировать
                </Button>
            </div>
        </div>
    </div>
</template>
