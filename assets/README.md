# vue全家桶

## 项目目录
```
- src
  - api   和后端接口交互
  - assets 图片等静态资源文件
  - routers 路由模块
  - services 公共服务模块， 用来写一个公共调用的方法
  - stores   vuex
    - actions
    - modules
    - mutations
    - index.js

  - views   顶级页面
    - common
      - comps 公共子组件模块
      - filters 公共过滤器
      - directives 公共指令

    - home 以home组件为例
      - index.js
      - index.styl
      - index.vue
      - filters.js
      - comps home组件需要的子组件
        - index.js   导出次文件夹下的所有component组件
        - header.js
        - header.styl
        - header.vue
        - main.js
        - main.styl
        - main.vue
  - config.js
  - main.css
  - main.js

- index.html
- test
  - e2e
  - unit
```

## 注：
  1.  通常文件夹都需要有index.js，用于本文件夹描述需要向外部暴露功能。
  1.  每个文件开头有一段说明， 解释这个文件的作用
  1.  所有文件名都用小写，用‘-’连接
  1.  不要分号， 禁止多余的冒号
  1.  变量命名用小驼峰`helloWorld`， 类用大驼峰`HelloWorld`
  1.  生产没 console debugger
  1.  no-undef
  1.  一个函数20行以内
  1.  一行代码不超过[120个字符，airbnb推荐100字符](https://github.com/lin-123/eslint-config-airbnb-ch#whitespace--max-len)
  1.  缩进两个空格
  1.  css类 小写字母用‘-’连接  .item-nav-li
  1.  备忘写在TODO.md中

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## deploy
- 通过CI发布

## 扩展
  - webpack代码分离 [webpack 1.0](https://webpack.github.io/docs/code-splitting.html), [webpack 2.0+](https://webpack.js.org/guides/code-splitting/)
