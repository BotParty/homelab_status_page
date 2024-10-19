module.exports = {
  // https://github.com/microsoft/clarity
  //prefix: "tw-",
  darkMode: false, // or 'media' or 'class'

  variants: {
    extend: {},
  },
  plugins: [],
  content: ["./views/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "near-black": "#101010",
        "near-white": "#f5f5f5",
        slate: {
          900: "#0f172a", // Add custom color scale
          // Add other scales if needed
        },
      },
      fontFamily: {
        "spline-mono": ["Spline Mono", "monospace"], // Add your custom font family
      },
      gridColumn: {
        "span-6": "span 6 / span 6",
        "span-7": "span 7 / span 7",
      },
      animation: {
        rotate: "rotate 10s linear infinite",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
      },
      fontFamily: {
        mono: ["Courier Prime", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/forms"),
    // require("tailwindcss-children"),
    // require("tailwindcss-debug-screens"),
    // require("tailwindcss-gradients"),
    // require("tailwindcss-interaction-variants"),
    // require("tailwindcss-multi-theme"),
    // require("tailwindcss-pseudo-elements"),
    // require("tailwindcss-scrollbar"),
    // require("tailwindcss-textshadow"),
    // require("tailwindcss-typography")({
    //   modifiers: ['DEFAULT', 'sm', 'lg', 'xl'],
    // }),

    // require("daisyui"),
    // iconsPlugin({
    //    collections: getIconCollections(["ic", "mdi"]),
    // }),
  ],
  // daisyui: {},
};
