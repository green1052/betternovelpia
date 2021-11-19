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
    require: ["https://openuserjs.org/src/libs/sizzle/GM_config.js"],
    grant: [
        "GM_getValue",
        "GM_setValue",
        "GM_setClipboard",
        "unsafeWindow"
    ],
    version: version
};

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: "swc-loader"
            },
            {
                test: /\.html$/,
                include: /html/,
                loader: "html-loader"
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