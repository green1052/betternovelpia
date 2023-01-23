const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const WebpackUserscript = require("webpack-userscript");
const {DefinePlugin} = require("webpack");
const {version} = require("./package.json");
const header = require("./src/header.json");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "betternovelpia.user.js",
        publicPath: ""
    },
    devServer: {
        static: {
            directory: "./dist",
            publicPath: ""
        }
    },
    plugins: [
        new DefinePlugin({
            VERSION: JSON.stringify(`${version}-dev`)
        }),
        new WebpackUserscript({
            headers: {
                ...header,
                version: `${version}-build.[buildNo]`
            },
            metajs: false,
            pretty: false,
            proxyScript: {
                baseUrl: "http://127.0.0.1:8080",
                filename: "[basename].proxy.user.js",
                enable: true
            }
        })
    ]
});