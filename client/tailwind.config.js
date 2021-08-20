module.exports = {
    purge: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            maxHeight: {
                modal: "500px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
