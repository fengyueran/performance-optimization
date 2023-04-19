module.exports = function (api) {
  api.cache(true);

  const presets = [
    // 'react-app',
    [
      '@babel/preset-env',
      {
        //modules为false可以避免转换es模块
        modules: false,
        //按需引入polyfill
        useBuiltIns: 'usage',
        targets: {
          //,分割是并集，编译出来的代码兼容全球大于1%占有率的、或者浏览器最新的两个版本，或者Firefox ESR
          browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        },
      },
      // {
      //   modules: false,
      //   useBuiltIns: 'usage',
      //   corejs: 3,
      //   targets: {
      //     browsers: [
      //       'Chrome >= 90',
      //       //   'Safari >= 10.1',
      //       //   'iOS >= 10.3',
      //       //   'Firefox >= 54',
      //       //   'Edge >= 15',
      //     ],
      //   },
      // },
    ],
    '@babel/preset-react',
  ];
  const plugins = [];

  return {
    presets,
    plugins,
  };
};
