import { ref, watch } from "vue";

export default function createStoreObject(name, default_values) {
    const obj = ref({ ...default_values });
    var local_values = {};
    if (localStorage.getItem(name))
        try {
            local_values = JSON.parse(localStorage.getItem(name));
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
