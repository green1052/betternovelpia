const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const {UserscriptPlugin} = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "betternovelpia.user.js"
    },
    plugins: [
        new UserscriptPlugin({
            headers: "./src/header.json"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })
        ]
    }
});