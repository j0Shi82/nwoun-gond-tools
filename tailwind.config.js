// eslint-disable-next-line import/no-extraneous-dependencies
const customForms = require('@tailwindcss/forms');

module.exports = {
  plugins: [
    customForms,
  ],
  purge: [
    './src/**/*.svelte',
  ],
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
  },
};
