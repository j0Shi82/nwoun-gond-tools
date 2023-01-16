const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

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
    path: prod ? `${__dirname}/dist/page` : `${__dirname}/dist`,
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
            dev: !prod,
            compilerOptions: {
              dev: !prod,
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
        type: 'asset/resource',
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
    new webpack.DefinePlugin({
      'process.env.SITE_URL': JSON.stringify(process.env.SITE_URL),
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Neverwinter Gond Tools',
      template: './src/index.template.html',
      filename: prod ? '../index.html' : 'index.html',
      icon: 'favicon-unbranded.png',
      baseUrl: process.env.SITE_URL,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'dist') },
      ],
    }),
  ],
  devtool: prod ? false : 'source-map',
  target: 'web',
};
