import path from "path";
import WebpackUserscript from "webpack-userscript";
import TerserPlugin from "terser-webpack-plugin";
import {cpus} from "os";
import {Configuration} from "webpack";
import {version} from "./package.json";

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

export default {
    mode: "production",
    entry: path.join(__dirname, "src", "index.ts"),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                include: /src/
            }
        ]
    },
    resolve: {
        extensions: [".ts"]
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
} as Configuration;