import colors from "tailwindcss/colors";

export const theme = {
    extend: {
        colors: {
            // you can either spread `colors` to apply all the colors
            ...colors,
        },
    },
};
