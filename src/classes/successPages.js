import { first } from "./successPages/first";
import { adcombo } from "./successPages/adcombo";

export const success_page_names = ["first", "adcombo"];

export function getAvailableLanguages() {
    const languages = [];
    success_page_names.forEach((name) =>
        Object.keys(getSuccessPage(name).translates).forEach((lang) => {
            if (languages.indexOf(lang) === -1) languages.push(lang);
        })
    );
    return languages;
}

export function getSuccessPagePreviews(language) {
    const previews = {};
    success_page_names.forEach((name) => {
        if (Object.keys(getSuccessPage(name).translates).indexOf(language) !== -1)
            previews[name] = getSuccessPage(name).preview;
    });
    return previews;
}

export function getSuccessPage(name) {
    switch (name) {
        case "first":
            return first;
        case "adcombo":
            return adcombo;
    }
}
