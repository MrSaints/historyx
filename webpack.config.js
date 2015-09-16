var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: "./src/app.jsx",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "babel-loader" }
        ]
    }
};