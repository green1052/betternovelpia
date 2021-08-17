const path = require("path");
const WebpackUserscript = require("webpack-userscript");
const TerserPlugin = require("terser-webpack-plugin");
const {cpus} = require("os");
const {DefinePlugin} = require("webpack");
const {version} = require("./package.json");

const header = {
    "name": "BetterNovelpia",
    "namespace": "betternovelpia",
    "description": "노벨피아를 더 좋게 바꿔줍니다!",
    "author": "green1052",
    "homepageURL": "https://github.com/green1052/betternovelpia",
    "rut-at": "document-start",
    "include": "novelpia.com",
    "require": [
        "https://raw.githubusercontent.com/green1052/GM_config/master/gm_config.min.js"
    ],
    "grant": [
        "GM_getValue",
        "GM_setValue",
        "unsafeWindow"
    ],
    "version": version
};

module.exports = {
    mode: "production",
    entry: path.join(__dirname, "src", "index.ts"),
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: /src/,
                use: "swc-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "betternovelpia.user.js"
    },
    plugins: [
        new WebpackUserscript({
            metajs: false,
            headers: header
        }),
        new DefinePlugin({
            VERSION: JSON.stringify(version)
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false
                    }
                },
                extractComments: false,
                parallel: cpus().length - 1
            })
        ]
    }
};