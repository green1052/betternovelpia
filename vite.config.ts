import {defineConfig} from "vite";
import preact from "@preact/preset-vite";
import monkey from "vite-plugin-monkey";

export default defineConfig({
    build: {
        minify: "oxc"
    },
    plugins: [
        preact(),
        monkey({
            entry: "src/index.ts",
            userscript: {
                name: "BetterNovelpia",
                namespace: "BetterNovelpia",
                description: "노벨피아를 더 좋게 바꿔줍니다!",
                "run-at": "document-start",
                match: "https://novelpia.com/*",
                homepageURL: "https://github.com/green1052/betternovelpia",
                supportURL: "https://github.com/green1052/betternovelpia/issues",
                downloadURL: "https://github.com/green1052/betternovelpia/releases/latest/download/betternovelpia.user.js",
                updateURL: "https://github.com/green1052/betternovelpia/releases/latest/download/betternovelpia.meta.js"
            },
            build: {
                fileName: "betternovelpia.user.js",
                metaFileName: "betternovelpia.meta.js"
            }
        })
    ]
});
