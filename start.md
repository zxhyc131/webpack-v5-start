# 一步一步开的 webpack 配置

## 1 创建一个目录，使用 npm 快速初始化

```bash
mkdir myApp && cd ./myApp && npm init -y
```

## 2 安装依赖

安装 `webpack` 以及 `babel`

```bash
npm install --save-dev webpack@5 webpack-cli@4 webpack-dev-server@3 html-webpack-plugin babel-loader@8 @babel/core @babel/preset-env @babel/plugin-transform-react-jsx
```

安装 Nerv

```bash
npm install --save nervjs
```

## 3 添加配置文件

在项目根目录下添加一个简单的 webpack 配置文件 `webpack.config.js`

在项目根目录下添加一个 babel 的配置文件`.babelrc`

```bash
touch webpack.config.js && touch .babelrc
```

`webpack.config.js`

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{ test: /\.js$/, use: 'babel-loader' }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
}
```

`.babelrc`

```json
{
    "presets": [
        [
            "@babel/env",
            {
                "spec": true,
                "useBuiltIns": false
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "pragma": "Nerv.createElement"
            }
        ]
    ]
}
```

## 4 添加项目入口文件

在项目根目录下添加一个入口 html 文件 index.html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
            content="width=device-width,minimum-scale=1.00001,maximum-scale=1.00001,user-scalable=no,viewport-fit=cover"
            name="viewport"
        />
        <!-- <link rel="icon" href="favicon.ico" /> -->
        <meta name="google" content="notranslate" />
        <title>title</title>
    </head>
    <body>
        <noscript>
            <strong
                >We're sorry but it doesn't work properly without JavaScript
                enabled. Please enable it to continue.</strong
            >
        </noscript>
        <div id="app"></div>
        <!-- built files will be auto injected -->
    </body>
</html>
```

## 5 书写代码

然后就可以书写代码了，新建一个 src 目录，添加一个 Hello.js 文件

```js
import Nerv from 'nervjs'
// import { Component, createElement } from 'nervjs'

class Hello extends Nerv.Component {
    constructor() {
        super(...arguments)
        this.state = {
            message: 'world'
        }
    }

    render() {
        return <div>Hello, {this.state.message}</div>
    }
}

export default Hello
```

随后在 src 目录下新建一个 index.js 文件来调用 Hello.js

```js
import Nerv from 'nervjs'
import Hello from './Hello'

Nerv.render(<Hello />, document.getElementById('app'))
```

最后在 package.json 文件的 scripts 字段中增加

```json
"scripts": {
    "dev": "webpack serve --mode=development --config webpack.config.js",
    "build": "webpack --mode=production --config webpack.config.js"
}
```

在项目根目录下执行 npm run dev，就能在浏览器中看到效果了！
