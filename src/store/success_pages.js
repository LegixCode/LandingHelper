import { defineStore } from "pinia";
import { computed, watch } from "vue";
import all_languages from "@/classes/languages";
import createStoreObject from "@/classes/storage_object";
import { first } from "@/classes/successPages/first";
import { adcombo } from "@/classes/successPages/adcombo";

export const useSuccessPagesStore = defineStore("success_pages", () => {
    const success_pages = [first, adcombo];

    const config = createStoreObject("success_page_config", {
        name: success_pages[0].name,
        language: "en",
        fb_pixel: true,
    });

    watch(
        () => config.value.language,
        () => {
            if (!available_pages.value.find((p) => p.name == config.value.name))
                config.value.name = available_pages.value[0].name;
        }
    );

    const languages = [...new Set(success_pages.flatMap((s) => Object.keys(s.translates)))].sort((a, b) =>
        all_languages[a] > all_languages[b] ? 1 : -1
    );

    const available_pages = computed(() => {
        return success_pages.filter((p) => Object.keys(p.translates).indexOf(config.value.language) !== -1);
    });

    const current_page_template = computed(() => {
        var current_page = success_pages.find((p) => p.name == config.value.name);
        var translate = current_page.translates[config.value.language];
        if (!translate) return "";
        return current_page.template.replaceAll(/{(\w)+}/g, (match) => {
            if (["{pixel}", "{name}", "{phone}"].indexOf(match) !== -1) return match;
            var _match = match.substring(1, match.length - 1);
            return translate[_match];
        });
    });

    function getCompletedTemplate() {
        return current_page_template.value.replaceAll(/{(\w)+}/g, (match) => {
            if (match == "{pixel}")
                if (!config.value.fb_pixel) return "";
                else
                    return `
        <!-- Facebook Pixel Code -->
        \<script>
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
        fbq('init', '<?= $_REQUEST["pixel"]; ?>');
        fbq('track', 'Lead');
        \<\/script>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=<?= $_REQUEST['pixel']; ?>&ev=Lead&noscript=1" />
        <!-- End Facebook Pixel Code -->
            `;
            if (match == "{name}") return '<?= $_REQUEST["name"]; ?>';
            if (match == "{phone}") return '<?= $_REQUEST["phone"]; ?>';
            return match;
        });
    }

    return { config, languages, available_pages, current_page_template, getCompletedTemplate };
});
