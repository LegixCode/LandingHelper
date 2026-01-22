<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";

const example_date = "<" + "script>dtime_nums(0)" + "<" + "/script>";

function copy() {
    window.toClipboard(
        import("@/classes/scripts/dtime_nums.ts").then((obj) => "<" + "script>\n" + obj.dtime_nums + "\n<" + "/script>")
    );
}
</script>
<template>
    <div class="shadow-card rounded-lg p-6 space-y-3">
        <div class="flex flex-wrap items-center">
            <div class="font-bold">dtime_nums.js</div>
            <BaseButton color="purple" @click="copy" class="ml-auto">Скопировать</BaseButton>
        </div>
        <div class="text-[13px] text-slate-600 indent-8">
            Скрипт для вывода актуальных дат на лендинг. Обратите внимание, скрипт нужно устанавливать в начале
            документа между тегами <b>&lt;head&gt;&lt;/head&gt; </b>
        </div>
        <div class="text-[13px] text-slate-600 indent-8">
            Функция <b>dtime_nums</b> в качестве параметров принимает количество дней которые требуется отнять или
            прибавить к текущей дате (0 - сегодня, 1 - завтра, -2 - позавчера и т.д.). Чтобы вывести дату, встаьте код в
            нужное место как на примере ниже.
        </div>
        <div class="text-[13px] p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>{{ example_date }}</code>
            <div
                class="absolute right-0 inset-y-0 flex items-center group-hover:opacity-100 transition-opacity opacity-0"
            >
                <BaseButton color="purple" v-clipboard="example_date" class="bg-slate-200/90 rounded-xl">
                    Скопировать
                </BaseButton>
            </div>
        </div>
    </div>
</template>
