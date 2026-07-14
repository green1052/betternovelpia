import { watch } from "node:fs";
import { join } from "node:path";
import { globImportPlugin } from "bun-plugin-glob-import";
import header from "./src/header.json";
import pkg from "./package.json";

const DIST_DIR = "./dist";
const OUTPUT_NAME = "betternovelpia.user.js";
const META_NAME = "betternovelpia.meta.js";

type HeaderValue = string | string[] | boolean | undefined;
type HeaderData = Record<string, HeaderValue>;

function generateUserscriptHeader(headers: HeaderData): string {
    const lines: string[] = ["// ==UserScript=="];

    for (const [key, value] of Object.entries(headers)) {
        if (value === undefined || value === null) continue;

        if (Array.isArray(value)) {
            for (const item of value) {
                lines.push(`// @${key.padEnd(12)}${item}`);
            }
        } else if (typeof value === "boolean") {
            if (value) lines.push(`// @${key}`);
        } else {
            lines.push(`// @${key.padEnd(12)}${value}`);
        }
    }

    lines.push("// ==/UserScript==");
    return lines.join("\n");
}

async function bundle(minify: boolean, banner?: string): Promise<void> {
    const result = await Bun.build({
        entrypoints: ["./src/index.ts"],
        outdir: DIST_DIR,
        target: "browser",
        minify,
        format: "iife",
        naming: OUTPUT_NAME,
        plugins: [globImportPlugin()],
        banner: banner ? banner : undefined,
    });

    if (!result.success) {
        for (const log of result.logs) {
            console.error(log);
        }
        throw new Error("Build failed");
    }
}

async function buildProduction(): Promise<void> {
    const startTime = performance.now();

    const headerBlock = generateUserscriptHeader(header as HeaderData);
    await bundle(true, headerBlock);
    await Bun.write(join(DIST_DIR, META_NAME), headerBlock);

    console.log(`Build completed in ${(performance.now() - startTime).toFixed(0)}ms`);
}

let buildNo = 0;

async function buildDev(): Promise<void> {
    buildNo++;
    const startTime = performance.now();

    const devHeader: HeaderData = {
        ...header,
        version: `${pkg.version}-build.${buildNo}`,
        updateURL: "http://127.0.0.1:8080/betternovelpia.user.js",
        downloadURL: "http://127.0.0.1:8080/betternovelpia.user.js",
    };
    const headerBlock = generateUserscriptHeader(devHeader);
    await bundle(false, headerBlock);

    console.log(`Dev build #${buildNo} completed in ${(performance.now() - startTime).toFixed(0)}ms`);
}

async function devServer(): Promise<void> {
    await buildDev();

    let debounce: Timer | undefined;
    watch(join(import.meta.dir, "src"), { recursive: true }, () => {
        clearTimeout(debounce);
        debounce = setTimeout(async () => {
            try {
                await buildDev();
            } catch (e) {
                console.error(e);
            }
        }, 300);
    });

    Bun.serve({
        port: 8080,
        fetch(req) {
            const url = new URL(req.url);
            if (url.pathname === `/${OUTPUT_NAME}`) {
                return new Response(Bun.file(join(DIST_DIR, OUTPUT_NAME)), {
                    headers: { "Content-Type": "application/javascript" },
                });
            }
            if (url.pathname === `/${META_NAME}`) {
                return new Response(Bun.file(join(DIST_DIR, META_NAME)), {
                    headers: { "Content-Type": "application/javascript" },
                });
            }
            return new Response("Not found", { status: 404 });
        },
    });

    console.log("Dev server running at http://127.0.0.1:8080");
}

if (process.argv.includes("--dev")) {
    await devServer();
} else {
    await buildProduction();
}
