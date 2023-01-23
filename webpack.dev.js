const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const WebpackUserscript = require("webpack-userscript");
const {version} = require("./package.json");
const header = require("./src/header.json");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "betternovelpia.user.js",
        publicPath: ""
    },
    plugins: [
        new WebpackUserscript({
            headers: {
                ...header,
                version: `${version}-build.[buildNo]`,
                updateURL: "http://127.0.0.1:8080/betternovelpia.user.js",
                downloadURL: "http://127.0.0.1:8080/betternovelpia.user.js"
            },
            metajs: false,
            pretty: false
        })
    ]
});