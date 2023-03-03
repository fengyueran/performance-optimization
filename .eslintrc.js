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
