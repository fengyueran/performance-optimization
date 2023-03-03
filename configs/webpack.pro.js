const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { merge } = require('webpack-merge');
const PATHS = require('./paths');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

const proConfig = {
  /* 生产模式 */
  mode: 'production',

  /* models */
  module: {},

  /* 插件 */
  plugins: [new CleanWebpackPlugin()],
};

module.exports = merge(commonConfig, proConfig);
