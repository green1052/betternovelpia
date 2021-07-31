import path from "path";

import WebpackUserscript from "webpack-userscript";

import {version} from "./package.json";
import {Configuration} from "webpack";

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

const config: Configuration = {
    mode: "production",
    entry: path.join(__dirname, "src", "index.ts"),
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