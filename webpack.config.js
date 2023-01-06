const path = require('path')

module.exports = {
    entry: './static/src/javascript/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './static/dist/js')
    }
}