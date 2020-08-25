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

// eslint-disable-next-line no-unused-vars
const getPlugins = (target) => [
  tailwindcss,
  autoprefixer(),
  ...(prod ? [purgecss] : []),
  postcssDiscardDuplicates,
];

module.exports = ({ options = { target: 'modern' } }) => ({ plugins: getPlugins(options.target) });
