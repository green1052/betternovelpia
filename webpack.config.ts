import path from "path";

import WebpackUserscript from "webpack-userscript";

import {version} from "./package.json";
import webpack from "webpack";

const header = {
    "name": "BetterNovelpia",
    "namespace": "betternovelpia",
    "description": "노벨피아를 더 좋게 바꿔줍니다!",
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
    "version": version
};

const config: webpack.Configuration = {
    mode: "production",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: /src/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "browsers": ["last 2 versions"]
                                    }
                                }
                            ],
                            "@babel/preset-typescript"
                        ],
                        plugins: [
                            "@babel/transform-runtime"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
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

export default config;