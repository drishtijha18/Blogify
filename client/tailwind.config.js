export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#8149FD',
            },
            boxShadow: {
                'custom-sm': '0px 0px 8px rgba(0, 0, 0, 0.12)',
                '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.5)',
            },
        },
    },
    plugins: [],
}
