import { defineStore } from "pinia";
import { getListSubs } from "@/classes/listSubs";
import createStoreObject from "@/classes/storage_object";

export const useFormSubsStore = defineStore("form_subs", () => {
    const subs = createStoreObject(
        "subs",
        getListSubs().reduce(
            (result, name) => ({
                ...result,
                [name]: "",
            }),
            {}
        )
    );

    function getInputs() {
        return Object.keys(subs.value)
            .filter((name) => subs.value[name].length > 0)
            .map((name) => `<input type="hidden" name="${name}" value="${subs.value[name]}" />`)
            .join("\n");
    }

    return { subs, getInputs };
});
