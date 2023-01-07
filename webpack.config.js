const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        javascriptIndex: './static/src/javascript/index.js',
        stylesIndex: './static/src/styles/index.scss'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './static/dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
            },
            {
                test: /\.(css|scss)/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}
