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
      presets: [
        [
          '@babel/preset-env', {
            modules: false,
            loose: true,
            corejs: 3,
            targets: {
              browsers: ['> 0.25%', 'not dead', 'ie >= 11'],
            },
            useBuiltIns: 'entry',
          },
        ],
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', { corejs: 3 }],
      ],
    },
    modern: {
      presets: ['@babel/preset-modules'],
      plugins,
    },
  },
};

module.exports = isTest ? configTest : config;
