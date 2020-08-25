module.exports = {
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
      },
      spacing: {
        '1/1': '100%',
        '2/3': '66.66667%',
      },
    },
  },
};
