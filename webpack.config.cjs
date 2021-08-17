const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, "src/interpreter.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "interpreter_bundle.js",
        library: "crisp",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    mode: "production"

}