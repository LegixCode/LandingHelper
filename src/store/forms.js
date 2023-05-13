import { defineStore } from "pinia";
import { computed, watch } from "vue";
import createStoreObject from "@/classes/storage_object";
import { simple } from "@/classes/forms/simple";
import basic_phrases from "@/classes/forms/basic_phrases";

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

    const languages = (() => {
        let languages = [];
        forms.forEach((form) => {
            languages.push(Object.keys(form.translates ?? basic_phrases));
        });
        return [...new Set(...languages)];
    })();

    const current_form = computed(() => forms.find((f) => f.name == config.value.name));

    const available_forms = computed(() =>
        forms.filter((form) => Object.keys(form.translates ?? basic_phrases).indexOf(config.value.language) !== -1)
    );

    return { config, current_form, available_forms, languages };
});
