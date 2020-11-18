// https://github.com/michael-ciniawsky/postcss-load-config
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
module.exports = {
    plugins: [autoprefixer, cssnano]
}
