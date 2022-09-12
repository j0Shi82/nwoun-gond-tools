const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer(),
    postcssDiscardDuplicates,
  ],
};
