# babel-plugin-do-demand-loading

[diana](https://github.com/MuYunyun/diana) 配套按需加载 babel 插件

### Usage

```
npm install --save-dev babel-plugin-do-demand-loading
```

在 `.babelrc` 配置如下即可生效：

```
{
  "plugins": [
    ["on-demand-loading", {"library": "diana"}]
  ]
}
```

### Principle

```js
import { equal } from 'diana'
```

上述代码经过此插件转换后等同于下列代码，从而实现按需加载

```js
import equal from 'diana/lib/equal'
```

[按需加载实践](https://github.com/demos-platform/onDemandLoading)

