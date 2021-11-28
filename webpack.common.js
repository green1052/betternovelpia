const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const {version} = require("./package.json");
const WebpackUserscript = require("webpack-userscript");
const {DefinePlugin} = require("webpack");

const header = {
    name: "BetterNovelpia",
    namespace: "betternovelpia",
    description: "노벨피아를 더 좋게 바꿔줍니다!",
    author: "green1052",
    homepageURL: "https://github.com/green1052/betternovelpia",
    "rut-at": "document-start",
    match: "http*://novelpia.com/*",
    grant: [
        "GM_getValue",
        "GM_setValue",
        "GM_setClipboard",
        "unsafeWindow"
    ],
    version: version
};

module.exports = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", {targets: "defaults"}],
                        "@babel/preset-typescript",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "babel-plugin-styled-components",
                        ["@babel/plugin-transform-runtime", {"regenerator": true}]
                    ],
                    cacheDirectory: true
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    plugins: [
        new DefinePlugin({
            VERSION: JSON.stringify(version)
        }),
        new CleanTerminalPlugin({
            beforeCompile: true
        }),
        new WebpackUserscript({
            headers: header,
            metajs: false,
            pretty: false
        })
    ]
};