import createStoreObject from "@/classes/storageObject.ts";
import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import type { IPartner } from "@/types/Partner.ts";

export const usePartnersStore = defineStore("partners", () => {
    const partners = {
        adcombo: "Adcombo",
        cpagetti: "CPAgetti",
        drcash: "dr.cash",
        everad: "Everad",
        kma: "KMA",
        leadbit: "Leadbit",
        leadreaktor: "Leadreaktor",
        leadrock: "LeadRock",
        leadtrade: "Leadtrade",
        lemonad: "LemonAD",
        m1: "M1",
        shakes: "Shakes",
        skylead: "SkyLead",
        trafficlight: "TrafficLight",
        webvork: "WebVork",
    };

    const config = createStoreObject("partner", {
        name: Object.keys(partners)[0],
        write_log: true,
    });
    watch(
        () => config.value.name,
        () => loadPartner()
    );

    const partner = ref();
    const partner_props = ref();
    const partner_subs = ref();

    function loadPartner() {
        import(`@/classes/pp/${config.value.name}.ts`).then((script: { default: IPartner }) => {
            partner.value = script.default;
            partner_props.value = createStoreObject(
                config.value.name + "_props",
                Object.keys(partner.value.props).reduce(
                    (result, name) => ({
                        ...result,
                        [name]: "",
                    }),
                    {}
                )
            );
            partner_subs.value = createStoreObject(config.value.name + "_subs", partner.value.subs);
        });
    }
    loadPartner();

    const order_file = computed(() => {
        if (!partner.value) return "";
        let config_var = `$config = (object)[
            ${Object.keys(partner_props.value.value)
                .map((key) => `"${key}" => "${partner_props.value.value[key]}",`)
                .join("\n")}
          ];`;
        let template = `
            if (!isset($_POST['name'], $_POST['phone'])){
                header('Location: ' . $_SERVER['HTTP_REFERER']);
                exit; }
            `;
        if (config.value.write_log)
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
        template += partner.value.template.replaceAll(/{(\w)+}/g, (match: string) => {
            if (match == "{success_page}")
                return `header("Location: success.php?pixel=" . urlencode($_POST["pixel"]) . "&event=" . urlencode($_POST["event"]) . "&name=" . urlencode($_POST["name"]) . "&phone=" . urlencode($_POST["phone"]) . "&referer=" . urlencode($_SERVER['HTTP_REFERER']));`;
            if (match == "{write_log}")
                return config.value.write_log ? `write_log(json_encode($request_params), $result);` : "";
            const _match = match.substring(1, match.length - 1);
            if (partner_subs.value.value[_match] !== undefined)
                return partner_subs.value.value[_match].length
                    ? '$_POST["' + partner_subs.value.value[_match] + '"]'
                    : '""';
            return match;
        });
        return "<?php\n" + config_var + "\n" + template;
    });

    const formated_order_file = ref();
    watch(
        () => order_file.value,
        () => {
            import("prettier/standalone").then((prettier) => {
                import("@prettier/plugin-php/standalone").then((phpPlugin) => {
                    prettier
                        .format(order_file.value, {
                            // @ts-ignore
                            plugins: [phpPlugin],
                            parser: "php",
                            printWidth: 120,
                            phpVersion: "8.1",
                        })
                        .then((formatedLines) => (formated_order_file.value = formatedLines));
                });
            });
        }
    );

    return { partners, partner, config, partner_props, partner_subs, formated_order_file };
});
