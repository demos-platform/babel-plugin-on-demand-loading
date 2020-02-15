[![npm version](https://badge.fury.io/js/babel-plugin-on-demand-loading.svg)](https://badge.fury.io/js/babel-plugin-on-demand-loading) ![LICENSE MIT](https://img.shields.io/npm/l/babel-plugin-on-demand-loading.svg)

[diana](https://github.com/MuYunyun/diana) 配套按需加载 babel 插件，[更新日志](CHANGELOG.md)

### Usage

```
npm install --save-dev babel-plugin-on-demand-loading
```

使用方式一：在 `.babelrc` 里进行配置(推荐):

```js
// .babelrc
{
  "plugins": [
    ["on-demand-loading", {"library": "diana"}]
  ]
}

// 配合 webpack 里的 babel-loader
module: {
  rules: [{
    test: /\.js$/,
    loader: "babel-loader",
  }]
},
```

使用方式二：在 webpack 里进行配置：

```diff
module: {
  rules: [{
    test: /\.js$/,
    loader: "babel-loader",
+   options: {
+     plugins: [
+       ["on-demand-loading", { "library": "diana" }],
+     ]
+   }
  }]
},
```

> [按需加载实践](https://github.com/demos-platform/onDemandLoading)
