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

const config = {
  presets: [
    ['@babel/preset-env', {
      bugfixes: true,
      targets: {
        esmodules: true,
      },
    }],
  ],
};

module.exports = isTest ? configTest : config;
