const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const WebpackUserscript = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "betternovelpia.user.js"
    },
    plugins: [
        new WebpackUserscript({
            headers: "./src/header.json",
            metajs: false,
            pretty: false
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