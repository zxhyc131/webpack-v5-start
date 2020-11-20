# 一步一步开的 webpack 配置

## 1 创建一个目录，使用 npm 快速初始化

```bash
mkdir my-app && cd ./my-app && npm init -y
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

### 可选配置

#### css less 处理

```bash
npm install -D css-loader less less-loader style-loader postcss-loader cssnano  autoprefixer url-loader
```

```js
   { test: /\.jsx?$/, use: 'babel-loader', exclude: '/node_modules/' },
            {
                test: /\.css$/,
                use: [
                    // NODE_ENV === 'production'
                    //     ? MiniCssExtractPlugin.loader
                    //     : 'style-loader',
                    {
                        loader: 'style-loader' // 创建 <style></style>
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                /*  当配置多个loader时，loader的执行顺序时从右往左，右边的执行结果作为参数传到左边。
                    less-loader把less转化成css，传给css-loader，css-loader把结果给style-loader，
                    style-loader返回javascript代码字符串。 */
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader' // 编译 Less -> CSS
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
```

创建`postcss.config.js`

```bash
touch postcss.config.js
```

```js
// https://github.com/michael-ciniawsky/postcss-load-config
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
module.exports = {
    plugins: [autoprefixer, cssnano]
}
```

创建`.browserslistrc`

```bash
touch .browserslistrc
```

```none
last 2 version
> 1%
not ie <= 10
not dead
```

### TODO

- [ ] typescript
- [ ] eslint
