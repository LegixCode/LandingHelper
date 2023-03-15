/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.vue"],
    theme: {
        extend: {
            boxShadow: {
                card: "0 0 2px 0 rgba(145,158,171,0.2), 0 12px 24px -4px rgba(145,158,171,0.12)",
            },
        },
    },
    plugins: [],
};
