const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const isAnalyze = process.env.ANALYZE_BUNDLE;
const proConfig = {
  /* 生产模式 */
  mode: 'production',

  /* models */
  module: {},

  /* 插件 */
  plugins: [
    new CleanWebpackPlugin(),
    isAnalyze && new BundleAnalyzerPlugin(),
  ].filter((v) => Boolean(v)),
};

module.exports = merge(commonConfig, proConfig);
