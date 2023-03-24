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
            Простой скрипт для вывода таймера. Добавьте к тегу в котором должен быть таймер атрибут <b>id="simple_timer"</b>.
            Обратите внимание, скрипт должен располагаться после места где будет выводиться таймер, например перед закрывающим тегом <b>&lt;/body&gt;</b>. Функция <b>start_timer</b> в качестве параметров принимает количество минут. На примере ниже установлено 25 минут.
        </div>
        <div class="text-[13px] p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>start_timer(25);</code>
        </div>
    </div>
</template>
