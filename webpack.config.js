var webpack = require("webpack");

module.exports = {
    cache: true,
    entry: "./src/app.jsx",
    output: {
        path: __dirname + "/assets/js",
        filename: "bundle.js"
    },
    //devtool: "source-map",
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: "./node_modules",
            loader: "babel-loader"
        }]
    }
};