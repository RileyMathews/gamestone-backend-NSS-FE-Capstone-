const path = require('path')

module.exports = {
    entry: './static/src/javascript/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './static/dist/js')
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
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: 'source-map'
}