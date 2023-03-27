<script setup>
import Button from "@/components/ui/Button.vue";
import { toClipboard } from "@soerenmartius/vue3-clipboard";

function copy() {
    import("@/classes/scripts/simple_timer.js").then((obj) => {
        toClipboard("<" + "script>\n" + obj.simple_timer + "<" + "/script>");
    });
}
</script>
<template>
    <div class="shadow-card rounded-lg p-6 space-y-3">
        <div class="flex flex-wrap items-center">
            <div class="font-bold">simple_timer.js</div>
            <Button color="purple" @click="copy" class="ml-auto">Скопировать</Button>
        </div>
        <div class="text-[13px] text-slate-600 indent-8">
            Простой скрипт для вывода таймера и сохранением значения в куках, что бы при перезагрузке страницы не сбрасывалось значение. Обратите внимание, скрипт должен располагаться после мест где будет выводиться таймер, например перед закрывающим тегом <b>&lt;/body&gt;</b>. Функция <b>start_timer</b> в качестве параметров принимает <b>класс элементов</b> где будет таймер и стартовое <b>количество минут</b>. На примере ниже установлено 25 минут и таймер будет выводиться во всех элементах с классом "simple_timer".
        </div>
        <div class="text-[13px] p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>start_timer("simple_timer", 25);</code>
        </div>
    </div>
</template>
