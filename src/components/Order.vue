<script setup>
import Select from "@/components/ui/Select.vue";
import Button from "@/components/ui/Button.vue";
import Toggle from "@/components/ui/Toggle.vue";
import saveFile from "@/classes/saveFile.js";
import { getPPTemplate } from "@/classes/ppconfigs.js";
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import { computed, onMounted, ref, watch } from "vue";
import PPParams from "./PPParams.vue";
import PPSubs from "./PPSubs.vue";

const pp = ref(localStorage.getItem("pp") ?? "leadrock");
watch(
    () => pp.value,
    (val) => localStorage.setItem("pp", val)
);
const prop_values = ref({});
const pp_subs = ref({});
const write_log = ref(true);

const config = computed(() => {
    return `$config = (object)[
      ${Object.keys(prop_values.value)
          .map((key) => `"${key}" => "${prop_values.value[key]}",`)
          .join("\n")}
    ];`;
});

const order_template = computed(() => {
    var template = `
    if (!isset($_POST['name'], $_POST['phone'])){
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit; }
    `;
    if (write_log.value)
        template += `
        function write_log($request, $response) {
            $filename = "orderlog.php";
            if (file_exists($filename)) {
                $fp = fopen($filename, 'a');
            } else {
                $fp = fopen($filename, 'a');
                fwrite($fp, "<?php exit; ?>\\n");
            }
            $date_now = date('Y-m-d H:i:s');
            fwrite($fp, "Date: {$date_now}\\nRequest: {$request}\\nResponse: {$response}\\n\\n=====================\\n\\n");
            fclose($fp);
        }
    `;
    template += getPPTemplate(pp.value).replaceAll(/{(\w)+}/g, (match) => {
        if (match == "{success_page}")
            return `header("Location: success.php?pixel=" . urlencode($_POST["pixel"]) . "&name=" . urlencode($_POST["name"]) . "&phone=" . urlencode($_POST["phone"]) . "&referer=" . urlencode($_SERVER['HTTP_REFERER']));`;
        if (match == "{write_log}") return write_log.value ? `write_log(json_encode($request_params), $result);` : "";
        var _match = match.substring(1, match.length - 1);
        if (pp_subs.value[_match] !== undefined)
            return pp_subs.value[_match].length ? '$_POST["' + pp_subs.value[_match] + '"]' : '""';
        return match;
    });
    return template;
});

const order_file = ref("");
function format() {
    import("prettier/standalone").then((prettier) => {
        import("@prettier/plugin-php/standalone").then((phpPlugin) => {
            order_file.value = prettier.format("<?php\n" + config.value + "\n" + order_template.value, {
                plugins: [phpPlugin],
                parser: "php",
                printWidth: 120,
            });
        });
    });
}
onMounted(() => {
    watch(() => config.value, format);
    watch(() => order_template.value, format);
    format();
});
</script>
<template>
    <div class="flex flex-col lg:grid lg:grid-cols-3 gap-6 p-6">
        <div class="col-span-2">
            <div class="rounded-lg shadow-card border border-slate-100">
                <div class="flex gap-3 px-6 pt-6 pb-3 items-center">
                    <div class="font-bold">order.php</div>
                    <Button color="purple" @click="toClipboard(order_file)" class="ml-auto">Скопировать</Button>
                    <Button color="green" @click="saveFile('order.php', order_file)">Скачать</Button>
                </div>
                <div class="max-h-[450px] overflow-y-scroll px-6 pt-3 pb-6">
                    <pre class="text-xs"> {{ order_file }}</pre>
                </div>
            </div>
        </div>
        <div class="order-first lg:order-none self-start">
            <div class="flex flex-col">
                <Select label="ПП" v-model="pp">
                    <option value="adcombo">AdCombo</option>
                    <option value="drcash">Dr.Cash</option>
                    <option value="kma">KMA</option>
                    <option value="leadreaktor">LeadReaktor</option>
                    <option value="leadrock">LeadRock</option>
                    <option value="leadtrade">LeadTrade</option>
                    <option value="lemonad">Lemonad</option>
                    <option value="shakes">Shakes</option>
                    <option value="trafficlight">TrafficLight</option>
                </Select>
                <PPParams :pp="pp" v-model:prop_values="prop_values" />
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-800">
                <Toggle v-model="write_log" /> Сохранять лог лидов
            </div>
            <PPSubs :pp="pp" v-model:pp_subs="pp_subs" />
        </div>
    </div>
</template>
