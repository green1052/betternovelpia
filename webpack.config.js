const CleanTerminalPlugin = require("clean-terminal-webpack-plugin");
const {version} = require("./package.json");
const WebpackUserscript = require("webpack-userscript");
const {DefinePlugin} = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

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
        "GM_deleteValue",
        "GM_listValues",
        "GM_setClipboard",
        "unsafeWindow"
    ],
    version: version
};

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        filename: "betternovelpia.user.js"
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: "babel-loader"
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
        }),
        new ForkTsCheckerWebpackPlugin()
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