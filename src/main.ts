import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/main.css";

declare global {
    interface Window {
        toClipboard: (value: string | Promise<string>) => void;
    }
}

window.toClipboard = function (value: string | Promise<string>) {
    if (typeof value === "object" && typeof value.then === "function") {
        if (typeof ClipboardItem && navigator.clipboard.write)
            navigator.clipboard.write([
                new ClipboardItem({
                    "text/plain": value.then((text) => new Blob([text], { type: "text/plain" })),
                }),
            ]);
        else value.then((text: string) => navigator.clipboard.writeText(text));
    } else navigator.clipboard.writeText(value as string);
};

const clipboardDirective = {
    mounted: (el: HTMLElement, binding: { value: (() => string) | string }) =>
        el.addEventListener("click", () => {
            window.toClipboard(typeof binding.value === "function" ? binding.value() : binding.value);
        }),
};

createApp(App).directive("clipboard", clipboardDirective).use(createPinia()).mount("#app");
