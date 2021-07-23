const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcssDiscardDuplicates = require('postcss-discard-duplicates');

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.svelte',
  ],

  whitelistPatterns: [/svelte-/],

  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer(),
    ...(prod ? [purgecss] : []),
    postcssDiscardDuplicates,
  ],
};
