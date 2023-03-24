<script setup>
import Button from "@/components/ui/Button.vue";
import saveFile from "@/classes/saveFile.js";
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import Select from "../../ui/Select.vue";
import { ref } from "vue";

var example_script = "<" + 'script src="js/dtime_nums.js">' + "<" + "/script>";
var example_date = "<" + "script>dtime_nums(-1)" + "<" + "/script>";

const format = ref("DD.MM.YYYY");

function save() {
    import("@/classes/scripts/dtime_nums.js").then((obj) => {
        saveFile("dtime_nums.js", obj.getDTimeNums(format.value));
    });
}
function copy() {
    import("@/classes/scripts/dtime_nums.js").then((obj) => {
        toClipboard("<" + "script>\n" + obj.getDTimeNums(format.value) + "\n<" + "/script>");
    });
}
</script>
<template>
    <div class="shadow-card p-6 space-y-3">
        <div class="flex flex-wrap items-center">
            <div class="font-bold">dtime_nums.js</div>
            <Select label="Форматы даты" v-model="format" class="ml-auto !border-0 !mt-0 !-mb-3">
                <option option="DD.MM.YYYY">DD.MM.YYYY</option>
                <option option="DD/MM/YYYY">DD/MM/YYYY</option>
                <option option="DD-MM-YYYY">DD-MM-YYYY</option>
                <option option="YYYY-MM-DD">YYYY-MM-DD</option>
                <option option="MM-DD-YYYY">MM-DD-YYYY</option>
                <option option="MM/DD/YYYY">MM/DD/YYYY</option>
            </Select>
            <div>
                <Button color="purple" @click="copy">Скопировать</Button>
                <Button color="green" @click="save">Скачать</Button>
            </div>
        </div>
        <div class="text-sm text-slate-600 indent-8">
            Скрипт для вывода актуальных дат на лендинг. Обратите внимание, скрипт нужно устанавливать в начале
            документа между тегами <b>&lt;head&gt;&lt;/head&gt; </b>
        </div>
        <div class="text-sm p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>{{ example_script }}</code>
            <div
                class="absolute right-0 inset-y-0 flex items-center group-hover:opacity-100 transition-opacity opacity-0"
            >
                <Button color="purple" @click="toClipboard(example_script)" class="bg-slate-200/90 rounded-xl"
                    >Скопировать</Button
                >
            </div>
        </div>
        <div class="text-sm text-slate-600 indent-8">
            Функция <b>dtime_nums</b> в качестве параметров принимает количество дней которые требуется отнять или
            прибавить к текущей дате (0 - сегодня, 1 - завтра, -2 - позовчера и т.д.). Что бы вывести дату, встаьте код
            в нужное место как на примере ниже.
        </div>
        <div class="text-sm p-3 bg-slate-200/70 rounded-lg w-full relative group">
            <code>{{ example_date }}</code>
            <div
                class="absolute right-0 inset-y-0 flex items-center group-hover:opacity-100 transition-opacity opacity-0"
            >
                <Button color="purple" @click="toClipboard(example_date)" class="bg-slate-200/90 rounded-xl"
                    >Скопировать</Button
                >
            </div>
        </div>
    </div>
</template>
