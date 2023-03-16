import { simple } from "./forms/simple";

export const form_names = ["simple"];

export function getAvailableLanguages() {
    const languages = [];
    form_names.forEach((name) =>
        Object.keys(getForm(name).translates).forEach((lang) => {
            if (languages.indexOf(lang) === -1) languages.push(lang);
        })
    );
    return languages;
}

export function getFormPreviews(language) {
    const previews = {};
    form_names.forEach((name) => {
        if (Object.keys(getForm(name).translates).indexOf(language) !== -1) previews[name] = getForm(name).preview;
    });
    return previews;
}

export function getForm(name) {
    switch (name) {
        case "simple":
            return simple;
    }
}
