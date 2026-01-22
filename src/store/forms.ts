import basic_phrases from "@/classes/forms/basic_phrases";
import createStoreObject from "@/classes/storageObject.ts";
import type { IForm } from "@/types/Form.ts";
import { computed, watch } from "vue";
import { defineStore } from "pinia";
import { simple } from "@/classes/forms/simple";
import { timer } from "@/classes/forms/timer";

export const useFormsStore = defineStore("forms", () => {
    const forms: IForm[] = [simple, timer];

    const config = createStoreObject("form_config", {
        name: (forms[0] as IForm).name,
        language: "en",
        old_price: "$78",
        new_price: "$39",
        show_phone_code: false,
        country_alpha2: "AE",
    });

    watch(
        () => config.value.language,
        () => {
            if (!availableForms.value.find((f) => f.name == config.value.name))
                config.value.name = (availableForms.value[0] as IForm).name;
        }
    );

    const languages = (() => {
        let languages: string[] = [];
        forms.forEach((form) => {
            languages.push(...Object.keys(basic_phrases));
        });
        return [...new Set(languages)];
    })();

    const currentForm = computed<IForm>(() => forms.find((f) => f.name == config.value.name) as IForm);

    const availableForms = computed(() =>
        forms.filter((form) => Object.keys(basic_phrases).includes(config.value.language))
    );

    return { config, currentForm, availableForms, languages };
});
