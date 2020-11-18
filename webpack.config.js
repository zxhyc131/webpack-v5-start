const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')

const NODE_ENV = process.env.NODE_ENV
console.info(`====== 当前环境：${NODE_ENV} ======`)

module.exports = {
    entry: './src/index.js',
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        publicPath: '/' // 打包后的资源的访问路径前缀
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            '@': path.join(__dirname, '..', 'src'), // 在项目中使用@符号代替src路径，导入文件路径更方便
            '@a': path.join(__dirname, '..', 'src/assets'),
            '@c': path.join(__dirname, '..', 'src/components')
        }
    },
    module: {
        rules: [
            { test: /\.jsx?$/, use: 'babel-loader', exclude: '/node_modules/' },
            {
                test: /\.css$/,
                use: [
                    NODE_ENV === 'production'
                        ? MiniCssExtractPlugin.loader
                        : 'style-loader',
                    // {
                    //     loader: 'style-loader' // 创建 <style></style>
                    // },
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
        ]
    },
    // 此选项控制是否生成，以及如何生成 source map
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9001,
        hot: true,
        open: true
    },
    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ]
}
