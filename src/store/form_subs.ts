import createStoreObject from "@/classes/storageObject";
import { defineStore } from "pinia";
import { getListSubs } from "@/classes/listSubs";

export const useFormSubsStore = defineStore("form_subs", () => {
    const subs = createStoreObject(
        "subs",
        getListSubs().reduce(
            (result: Record<string, string>, name: string) => ({
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
