export interface ISuccessPage {
    name: string;
    preview: string;
    translates: { [language: string]: { [key: string]: string } };
    template: string;
}
