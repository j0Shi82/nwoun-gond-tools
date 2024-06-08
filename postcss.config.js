import autoprefixer from 'autoprefixer';
import postcssDiscardDuplicates from 'postcss-discard-duplicates';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    tailwindcss,
    autoprefixer(),
    postcssDiscardDuplicates,
  ],
};