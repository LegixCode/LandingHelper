import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/main.css";

window.toClipboard = function (value) {
    if (typeof value === "object" && typeof value.then === "function") {
        if (typeof ClipboardItem && navigator.clipboard.write)
            navigator.clipboard.write([
                new ClipboardItem({
                    "text/plain": value.then((text) => new Blob([text], { type: "text/plain" })),
                }),
            ]); 
        else value.then((text) => navigator.clipboard.writeText(text));
    } else navigator.clipboard.writeText(value);
};

const clipboardDirective = {
    mounted: (el, binding) =>
        el.addEventListener("click", () => {
            toClipboard(binding.value);
        }),
};

createApp(App).directive("clipboard", clipboardDirective).use(createPinia()).mount("#app");
