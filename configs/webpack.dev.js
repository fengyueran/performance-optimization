const path = require('path');
const paths = require('./paths');
const webpack = require('webpack');
const { merge } = require('webpack-merge'); // 导入 merge 方法
const commonConfig = require('./webpack.common'); // 导入公共config

const devServer = {
  compress: true, // GZip压缩
  historyApiFallback: false, //找不到资源时不返回html,默认false
  host: '127.0.0.1',
  port: 8080,
  open: true, //自动打开浏览器
  hot: true, //开启热更新
};

const devConfig = {
  /* 模式 */
  mode: 'development',
  /* 本地服务 */
  devServer,
  /* sorce-map */
  devtool: 'cheap-module-source-map',
  /* 插件 */
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新
  ],
};

module.exports = merge(commonConfig, devConfig);
