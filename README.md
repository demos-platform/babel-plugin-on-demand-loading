[![npm version](https://badge.fury.io/js/babel-plugin-on-demand-loading.svg)](https://badge.fury.io/js/babel-plugin-on-demand-loading) ![LICENSE MIT](https://img.shields.io/npm/l/babel-plugin-on-demand-loading.svg)

[diana](https://github.com/MuYunyun/diana) 配套按需加载 babel 插件

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

### Principle

```js
import { equal } from 'diana'
```

上述代码经过此插件转换后等同于下列代码，从而实现按需加载

```js
import equal from 'diana/lib/equal'
```

### 源码分析

```js
const babel = require('babel-core');
const types = require('babel-types');

module.exports = function (babel) {
  return {
    visitor: {
      ImportDeclaration(path, ref = { opts: {} }) {
        let node = path.node
        let { specifiers } = node
        if (ref.opts.library === node.source.value
          && !types.isImportDefaultSpecifier(specifiers[0])         // 过滤 import { equal } from 'diana'
          && !types.isImportNamespaceSpecifier(specifiers[0])) {    // 过滤 import * as _ from 'diana'
          let newImports = specifiers.map(specifier => {
            return types.importDeclaration([types.importDefaultSpecifier(specifier.local)], types.stringLiteral(`${node.source.value}/lib/${specifier.local.name}`))
          })
          path.replaceWithMultiple(newImports)
        }
      }
    }
  }
}
```

[按需加载实践](https://github.com/demos-platform/onDemandLoading)

