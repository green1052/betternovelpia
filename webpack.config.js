const path = require("path");
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
    "include": "novelpia.com",
    "require": ["https://openuserjs.org/src/libs/sizzle/GM_config.js"],
    "grant": [
        "GM.getValue",
        "GM.setValue",
        "GM.setClipboard",
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
        }),
        new CleanTerminalPlugin({
            skipFirstRun: true,
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
                extractComments: false,
                parallel: true
            })
        ]
    }
};