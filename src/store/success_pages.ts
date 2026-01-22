import createStoreObject from "@/classes/storageObject.ts";
import type { ISuccessPage } from "@/types/SuccessPage.ts";
import { adcombo } from "@/classes/successPages/adcombo";
import { computed, watch } from "vue";
import { defineStore } from "pinia";
import { first } from "@/classes/successPages/first";

export const useSuccessPagesStore = defineStore("success_pages", () => {
    const success_pages = [first, adcombo];

    const config = createStoreObject("success_page_config", {
        name: (success_pages[0] as ISuccessPage).name,
        language: "en",
        fb_pixel: true,
    });

    watch(
        () => config.value.language,
        () => {
            if (!availablePages.value.find((p) => p.name == config.value.name))
                config.value.name = (availablePages.value[0] as ISuccessPage).name;
        }
    );

    const languages = [...new Set(success_pages.flatMap((s) => Object.keys(s.translates)))];

    const availablePages = computed(() => {
        return success_pages.filter((p) => Object.keys(p.translates).indexOf(config.value.language) !== -1);
    });

    const current_page_template = computed(() => {
        const currentPage = success_pages.find((p) => p.name == config.value.name) as ISuccessPage;
        const translate = currentPage.translates[config.value.language];
        if (!translate) return "";
        return currentPage.template.replaceAll(/{(\w)+}/g, (match: string): string => {
            if (["{pixel}", "{name}", "{phone}"].indexOf(match) !== -1) return match;
            const _match = match.substring(1, match.length - 1);
            return translate[_match] as string;
        });
    });

    function getCompletedTemplate() {
        return current_page_template.value.replaceAll(/{(\w)+}/g, (match) => {
            if (match == "{pixel}")
                if (!config.value.fb_pixel) return "";
                else {
                    const pixel = `<?= $_REQUEST["pixel"]; ?>`;
                    const event = `<?= !empty($_REQUEST["event"]) && $_REQUEST["event"] != '{event}' ? $_REQUEST["event"] : 'Lead'; ?>`;
                    return `
        <!-- Facebook Pixel Code -->
        \<script>
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments);};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);}(window,
        document,"script","https://connect.facebook.net/en_US/fbevents.js");
    
        fbq("init", "${pixel}");    
        fbq("track", "${event}");
        \<\/script>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=${pixel}&ev=${event}&noscript=1" />
        <!-- End Facebook Pixel Code -->
            `;
                }
            if (match == "{name}") return '<?= $_REQUEST["name"]; ?>';
            if (match == "{phone}") return '<?= $_REQUEST["phone"]; ?>';
            return match;
        });
    }

    return { config, languages, available_pages: availablePages, current_page_template, getCompletedTemplate };
});
