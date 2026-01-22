import { ref, watch } from "vue";

export default function createStoreObject(name: string, default_values: { [key: string]: any }) {
    const obj = ref({ ...default_values });
    var local_values: { [key: string]: any } = {};
    if (localStorage.getItem(name))
        try {
            local_values = JSON.parse(localStorage.getItem(name) as string);
            Object.keys(obj.value).forEach((key) => {
                if (local_values[key] !== undefined) obj.value[key] = local_values[key] ?? "";
            });
        } catch {}
    watch(
        () => obj.value,
        () => localStorage.setItem(name, JSON.stringify(obj.value)),
        {
            deep: true,
        }
    );
    return obj;
}
