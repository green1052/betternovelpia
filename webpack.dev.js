const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const {UserscriptPlugin} = require("webpack-userscript");
const {version} = require("./package.json");
const header = require("./src/header.json");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "betternovelpia.user.js",
        publicPath: ""
    },
    devServer: {
        client: {
            overlay: false
        },
        static: {
            directory: path.join(__dirname, "dist")
        }
    },
    plugins: [
        new UserscriptPlugin({
            headers: {
                ...header,
                version: `${version}-build.[buildNo]`,
                updateURL: "http://127.0.0.1:8080/betternovelpia.user.js",
                downloadURL: "http://127.0.0.1:8080/betternovelpia.user.js"
            }
        })
    ]
});
