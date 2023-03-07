const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const { merge } = require('webpack-merge');

const PATHS = require('./paths');
const proConfig = require('./webpack.pro');

const loading = {
  html: fs.readFileSync(path.join(__dirname, '../public/loading.html')),
};

const performanceConfig = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        },
      },
    },
  },
  plugins: [
    // new PrerenderSPAPlugin({
    //   routes: ['/'],
    //   staticDir: path.join(__dirname, '../dist'),
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'webpack-excrise',
    //   template: path.resolve(PATHS.public, 'index.html'),
    //   filename: path.resolve(PATHS.dist, 'index.html'),
    //   hash: true,
    //   loading,
    //   minify: {
    //     // removeAttributeQuotes: true, // 去除多余引号
    //     // collapseWhitespace: true, // 移除空格
    //     // removeComments: true, // 移除注释
    //   },
    // }),
  ],
};

module.exports = merge(performanceConfig, proConfig);
