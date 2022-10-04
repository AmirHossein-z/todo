/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                customdark: "#38404B",
                customText: "#94ADCF",
            },
            boxShadow: {
                custom: "10px 10px 15px 0px rgba(0,0,0,0.5)",
            },
        },
    },
    plugins: [],
};
