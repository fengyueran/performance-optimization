const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const PATHS = require('./paths');

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

module.exports = {
  /* 入口文件 */
  entry: './src/index.js',

  /* 出口文件 */
  output: {
    path: path.resolve(__dirname, PATHS.dist),
    filename: '[name].[contenthash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack-excrise',
      template: path.resolve(PATHS.public, 'index.html'),
      filename: path.resolve(PATHS.dist, 'index.html'),
      hash: true,
      minify: {
        // removeAttributeQuotes: true, // 去除多余引号
        // collapseWhitespace: true, // 移除空格
        // removeComments: true, // 移除注释
      },
      loading: {
        html: null,
      },
    }),
    new ESLintPlugin({
      fix: true, // 启用 ESLint 自动修复特性
      extensions: ['js', 'json', 'jsx'], // 需要排查的文件
      exclude: '/node_modules/', // 排除 node_module 的检查
    }),
  ],
};
