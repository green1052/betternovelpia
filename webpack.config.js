const path = require("path");
const WebpackUserscript = require("webpack-userscript");

const version = require("./package.json").version;

const header = {
    "name": "BetterNovelpia",
    "namespace": "betternovelpia",
    "description": "노벨피아를 더 좋게 바꿔줍니다!",
    "icon": "https://cdn.novelpia.com/img/favicon/android-icon-192x192.png",
    "author": "green1052",
    "homepageURL": "https://github.com/green1052/betternovelpia",
    "rut-at": "document-end",
    "include": "novelpia.com",
    "require": [
        "https://openuserjs.org/src/libs/sizzle/GM_config.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
    ],
    "grant": [
        "GM_getValue",
        "GM_setValue",
        "unsafeWindow"
    ],
    "version": `${version}`
};

module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.js|\.ts/,
                include: /src/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {targets: "last 2 versions"}],
                            "@babel/preset-typescript"
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "betternovelpia.user.js"
    },
    plugins: [
        new WebpackUserscript({
            metajs: false,
            headers: header
        })
    ]
};