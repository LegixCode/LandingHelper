<script setup>
import Button from "@/components/ui/Button.vue";
import saveFile from "@/classes/saveFile.js";

function copy() {
    toClipboard(
        import("@/classes/scripts/simple_timer.js").then(
            (obj) => "<" + "script>\n" + obj.simple_timer + "<" + "/script>"
        )
    );
}

function save() {
    toClipboard(
        import("@/classes/scripts/simple_timer.js")
            .then((obj) => {
                saveFile("simple_timer.js", obj.simple_timer);
                return obj;
            })
            .then((obj) => "<" + 'script src="js/simple_timer.js">' + "<" + "/script>")
    );
}
</script>
<template>
    <div class="shadow-card rounded-lg p-6 space-y-3">
        <div class="flex flex-wrap items-center">
            <div class="font-bold">simple_timer.js</div>
            <Button color="purple" @click="copy" class="ml-auto">Скопировать</Button>
            <Button color="green" @click="save">Скачать</Button>
        </div>
        <div class="text-[13px] text-slate-600 indent-8">
            Простой скрипт для вывода таймера. Обратите внимание, скрипт должен располагаться после мест где будет
            выводиться таймер, например перед закрывающим тегом <b>&lt;/body&gt;</b>.
        </div>
        <div class="text-[13px] text-slate-600 indent-0">
            Параметры функции <b>start_timer</b>:
            <ul class="list-decimal pl-6 indent-0">
                <li><b>Класс элементов</b> в которых выводится таймер</li>
                <li>
                    Если не указан, то время <b>до конца суток</b>. Иначе количество минут с которых
                    <b>начнется отсчет</b>
                </li>
            </ul>
        </div>
        <div class="text-[13px] p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>start_timer("simple_timer", 25);</code>
        </div>
        <div class="text-[13px] text-slate-600 indent-8">
            Если в элементе, класс которого передан первым параметров, присутствуют элементы с классами
            <b>"minutes"</b> и <b>"seconds"</b>, то скрипт распределит минуты, секунды и часы (класс <b>"hours"</b>) по ним, иначе заменит всё содержимое
            элемента на таймер.
        </div>
    </div>
</template>
