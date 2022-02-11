import toastr from "toastr";

toastr.options = {
    escapeHtml: true,
    closeButton: true,
    newestOnTop: false,
    progressBar: true
};

export const configs: Configs[] = [];

const context = require.context("./module/", true, /\.tsx?$/);

window.addEventListener("DOMContentLoaded", () => {
    for (const key of context.keys()) {
        const start = performance.now();

        const name = /(\w*)\.tsx?$/gi.exec(key)?.[1] ?? key;

        try {
            const module: Module = context(key).default;

            if (!module || typeof module.start != "function") continue;

            if (module.config) configs.push(module.config);

            if ((module.include === undefined || module.include.test(location.pathname)) &&
                (module.exclude === undefined || !module.exclude.test(location.pathname)) &&
                (module.enable === undefined || !module.enable.map(setting => GM_getValue<boolean>(setting, false)).includes(false))) {
                module.start();
                console.log(`${name}: 로드됨 ${(performance.now() - start).toFixed(2)}ms`);
            }
        } catch (e) {
            console.error(`${name}: ${e}`);
        }
    }
});