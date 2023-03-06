## webpack5 配置

webpack 中文文档链接:[webpack](https://webpack.docschina.org/configuration)

#### [entry](https://webpack.docschina.org/configuration/entry-context/#entry)

入口起点，告诉 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。默认值是 ./src/index.js，但也可以通过在 “webpack.config.js” 文件中的 entry 属性来配置，可以指定一个（或多个）不同的入口起点，例如

```js
// 单文件入口简写
module.exports = {
  entry: './src/index.js',
};

// 单文件入口完整写法
module.exports = {
  entry: {
    main: './src/index.js',
  },
};

// 多文件入口写法
module.exports = {
  entry: ['./src/index.js', './src/index_2.js'],
  output: {
    filename: 'bundle.js',
  },
};
```

#### [output](https://webpack.docschina.org/configuration/output/)

output 告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。也可通过在 “webpack.config.js” 文件中的  output 属性来配置

```js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
};

// 多入口的配置
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  // 写入到：./dist/app.js, ./dist/search.js
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
```

#### reslove

- extensions

  指定要检查的扩展名，假如不配置 jsx 就查找不到 jsx 后缀名的文件。

  ```js
  module.exports = {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // 导入语句没带文件后缀,webpack自动带上后缀文件
    },
  };
  ```

#### [mode](https://webpack.docschina.org/configuration/mode/)

模式，有生产模式（production）和开发模式（development）或 none。设置 mode 参数，可以启用 webpack 内置在相应环境下的优化

```js
// 其默认值为 production
module.exports = {
  mode: 'production',
};
```

#### [devtool](https://webpack.docschina.org/configuration/devtool/#root)

此选项控制是否生成，以及如何生成 source map。

```js
module.exports = {
  /* source-map */
  devtool: 'cheap-module-source-map',
};
```

#### [loader](https://webpack.docschina.org/concepts/loaders)

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。loader 的基本属性就两个:

- test：识别出哪些文件会被转换
- use：定义出在进行转换时，应该使用哪个 loader

```js
// 示例
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 最后执行 style-loader
          { loader: 'style-loader' },
          // 其次执行 css-loader
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          //  首先执行 sass-loader
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
```

在这里需要注意的是：module.rules 允许你在 webpack 配置中指定多个 loader。还有 loader 的执行顺序需要注意一下，他是从下到上依次执行的，配置过程中不要写错了。在上面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

- babel-loader

  babel-loader 可以转换代码，比如将 es6 代码转换为浏览器普遍支持的更低版本的代码，或者转换 jsx 语法等。

  安装依赖：

  ```
  $ yarn add babel-loader @babel/core babel-preset-react-app --dev
  ```

  webpack loader 配置:

  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            /*
            可以在babel配置文件babel.config.js中配置options
            options: {
              // 预定义的环境设置
              presets: [
                [
                  // 指定环境的插件
                  'react-app',
                ],
              ],
              // 开启babel缓存
              cacheDirectory: true,
            },
            */
          },
        },
      ],
    },
  };
  ```

  babel 配置文件:
  babel 配置文件可以是`.babelrc.json`、`.babelrc.js`、`babel.config.json`、`babel.config.js`

  ```js
  //babel.config.js
  module.exports = function (api) {
    api.cache(true);

    const presets = ['react-app'];
    const plugins = [];

    return {
      presets,
      plugins,
    };
  };
  ```

#### [plugins](https://webpack.docschina.org/configuration/plugins/)

loader 用于转换某些类型的模块，而 plugins（插件）则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。
插件的使用需要用 require() 引入，然后通过 new 操作符来创建一个实例 最后添加到 plugins 数组中。如下示例：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html的插件
module.exports = {
  module: {
    rules: [{ test: /\.css$/, use: 'css-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};
```

上述示例中  html-webpack-plugin 会为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。

#### webpack-dev-server

要启动开发服务，需要配置 devServer 并通过 webpack-dev-server 启动一个本地 server。

安装 webpack-dev-server：

```
yarn add webpack-dev-server -D
```

配置 server:

```js
const devServer = {
  compress: true, // GZip压缩
  historyApiFallback: false, //找不到资源时不返回html,默认false
  // host
  host: '127.0.0.1',
  // 端口
  port: 8000,
  // 热更新
  hot: true,
  // 启动时打开浏览器
  open: true,
};

module.exports = {
  // 环境设置：开发环境
  mode: 'development',
  // 便于开发调试 这里开启source-map模式
  devtool: 'cheap-module-source-map',
  // webpack-dev-server 的配置，webpack-dev-server 会提供一个本地服务(server)
  devServer,
};
```

#### 删除上次打包好的文件

安装依赖:

```
$ yarn add clean-webpack-plugin --dev
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

### 图片构建

在图片的构建中，以前的 webpack4 需要用到 url-loader 和 file-loader，但在 webpack5 中确不需要了。
webpack5 新增 资源模块（Asset Modules ）。资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
在 webpack5 之前，通常用 raw-loader 将文件导入为字符串、用 url-loader 将文件作为 data URI 内联到 bundle 中、用 file-loader 将文件发送到输出目录。但现在新增了资源模块后，资源模块通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

看一下 webpack4 和 webpack5 的代码的区别：

```js
// webpack4 的使用
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/i,
        use: 'file-loader',
      },
      {
        test: /\.ico$/i,
        use: 'url-loader',
      },
      {
        test: /\.text$/i,
        use: 'raw-loader',
      },
    ],
  },
};
```

```js
// webpack5 的使用
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ico$/i,
        type: 'asset/inline',
      },
      {
        test: /\.text$/i,
        type: 'asset/source',
      },
      {
        test: [/\.bmp$/, /\.gif$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000,
          },
        },
      },
    ],
  },
};
```

#### eslint

安装依赖:

```
$ yarn add eslint eslint-webpack-plugin eslint-config-react-app  typescript --dev
```

webpack 配置:

```js
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
  // ...
  plugins: [
    new ESLintPlugin({
      fix: true, // 启用 ESLint 自动修复特性
      extensions: ['js', 'json', 'jsx'], // 需要排查的文件
      exclude: '/node_modules/', // 排除 node_module 的检查
    }),
  ],
  // ...
};
```

eslint 配置:

```js
//.eslintrc.js
module.exports = {
  // eslint的配置主要走的是：typescript-eslint
  // 详细内容请参阅：https://typescript-eslint.io/
  parser: '@typescript-eslint/parser',
  // 可共享的配置 是一个npm包，输出的是一个配置对象。
  extends: ['react-app'],
  // 指定脚本的运行环境。每种环境都有一组特定的预约义全局变量。
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  // 输出的规则
  // plugins: ['react', 'prettier', '@typescript-eslint'],
  // 为特定类型的文件（ts、tsx）指定处理器。
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
      },
    },
  ],
  // 规则集，会覆盖extends中的规则
  rules: {},
};
```
