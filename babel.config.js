const isTest = process.env.NODE_ENV === 'test';

const configTest = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};

const plugins = [
  // "@babel/plugin-syntax-dynamic-import",
  // "@babel/plugin-proposal-export-default-from",
];

const config = {
  env: {
    legacy: {
      sourceType: 'unambiguous',
      presets: [
        [
          '@babel/preset-env', {
            // debug: true,
            corejs: { version: 3, proposals: true },
            targets: '> 1%, last 2 versions, ios >= 9, not dead, ie >= 11',
            useBuiltIns: 'usage',
          },
        ],
      ],
      plugins: [
        '@babel/plugin-transform-runtime',
        ...plugins,
      ],
    },
    modern: {
      presets: ['@babel/preset-modules'],
      plugins,
    },
  },
};

module.exports = isTest ? configTest : config;
