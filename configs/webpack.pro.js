const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const proConfig = {
  /* 生产模式 */
  mode: 'production',

  /* models */
  module: {},

  /* 插件 */
  plugins: [new CleanWebpackPlugin()],

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
};

module.exports = merge(commonConfig, proConfig);
