// eslint-disable-next-line import/no-extraneous-dependencies
const customForms = require('@tailwindcss/custom-forms');
// eslint-disable-next-line import/no-extraneous-dependencies
const colorAlpha = require('tailwind-color-alpha');

module.exports = {
  plugins: [
    colorAlpha(),
    customForms,
  ],
  purge: [
    './src/**/*.svelte',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      colors: {
        nwoun: '#b51208',
        // need to overwrite current for tailwind-color-alpha to work
        current: '#b51208',
      },
      spacing: {
        '1/1': '100%',
        '2/3': '66.66667%',
      },
    },
    customForms: (theme) => ({
      default: {
        select: {
          backgroundColor: theme('colors.black'),
          borderWidth: theme('borderWidth.2'),
          color: theme('colors.nwoun'),
          borderColor: theme('colors.nwoun'),
          fontWeight: theme('fontWeight.bold'),
        },
      },
    }),
  },
};
