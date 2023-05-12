import { defineStore } from "pinia";
import { computed, watch } from "vue";
import createStoreObject from "@/classes/storage_object";
import all_languages from "@/classes/languages";
import { simple } from "@/classes/forms/simple";

export const useFormsStore = defineStore("forms", () => {
    const forms = [simple];

    const config = createStoreObject("form_config", {
        name: forms[0].name,
        language: "en",
        old_price: "$78",
        new_price: "$39",
        show_phone_code: false,
        country_alpha2: "AE",
    });

    watch(
        () => config.value.language,
        () => {
            if (!available_forms.value.find((f) => f.name == config.value.name))
                config.value.name = available_forms.value[0].name;
        }
    );

    const languages = [...new Set(forms.flatMap((s) => Object.keys(s.translates)))].sort((a, b) =>
        all_languages[a] > all_languages[b] ? 1 : -1
    );

    const current_form = computed(() => forms.find((f) => f.name == config.value.name));

    const available_forms = computed(() =>
        forms.filter((form) => Object.keys(form.translates).indexOf(config.value.language) !== -1)
    );

    return { config, current_form, available_forms, languages };
});
