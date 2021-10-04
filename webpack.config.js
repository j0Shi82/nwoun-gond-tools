const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const sveltePath = path.resolve('node_modules', 'svelte');
const babelConfig = require('./babel.config');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    bundle: ['./src/main.js'],
  },
  devServer: {
    host: '0.0.0.0',
    static: [{
      directory: path.join(__dirname, 'dist'),
    }, {
      directory: path.join(__dirname, 'public'),
    }],
  },
  resolve: {
    alias: {
      svelte: sveltePath,
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    modules: ['src', 'node_modules'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(?:svelte|m?js)$/,
        include: [path.resolve(__dirname, 'src'), sveltePath],
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: 'babel-loader',
          options: {
            ...babelConfig,
          },
        },
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            dev: true,
            compilerOptions: {
              dev: true,
            },
            emitCss: true,
            hotReload: true,
            hotOptions: {
              optimistic: true,
            },
            preprocess: sveltePreprocess({
              postcss: true,
            }),
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|ttf|webp)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              webpackImporter: false,
              sassOptions: {
                includePaths: [
                  './src/assets/style',
                  './node_modules',
                ],
              },
            },
          },
        ],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Neverwinter Uncensored',
      template: './src/index.template.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
  devtool: prod ? 'source-map' : 'source-map',
  target: 'web',
};
