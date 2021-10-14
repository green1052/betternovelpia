const WebpackUserscript = require("webpack-userscript");
const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {DefinePlugin} = require("webpack");
const {version} = require("./package.json");

const header = {
    "name": "BetterNovelpia",
    "namespace": "betternovelpia",
    "description": "노벨피아를 더 좋게 바꿔줍니다!",
    "author": "green1052",
    "homepageURL": "https://github.com/green1052/betternovelpia",
    "rut-at": "document-start",
    "match": "http*://novelpia.com/*",
    "require": [
        "https://openuserjs.org/src/libs/sizzle/GM_config.js"
    ],
    "grant": [
        "GM_getValue",
        "GM_setValue",
        "GM.getValue",
        "GM.setValue",
        "unsafeWindow"
    ],
    "version": version
};

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        filename: "betternovelpia.user.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: /src/,
                loader: "swc-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new WebpackUserscript({
            headers: header,
            metajs: false,
            pretty: false
        }),
        new DefinePlugin({
            VERSION: JSON.stringify(version)
        }),
        new CleanTerminalPlugin({
            beforeCompile: true
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
                extractComments: false
            })
        ]
    }
};