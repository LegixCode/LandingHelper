export interface IForm {
    name: string;
    preview: string;
    scripts?: string[];
    style: string;
    template: string;
    translates?: { [language: string]: { [key: string]: string } };
}
