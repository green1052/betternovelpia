import $ from "jquery";
import toastr from "toastr";

export const configs: Configs[] = [];

toastr.options = {
    escapeHtml: true,
    closeButton: true,
    newestOnTop: false,
    progressBar: true
};

$(() => {
    const context = require.context("./module/", true, /\.tsx?$/);

    for (const key of context.keys()) {
        const start = performance.now();

        const name = /(\w*)\.tsx?$/gi.exec(key)?.[1] ?? key;

        try {
            const module: Module = context(key).default;

            if (module.config)
                configs.push(module.config);

            if ((module.include === undefined || module.include.test(location.pathname)) &&
                (module.exclude === undefined || !module.exclude.test(location.pathname)) &&
                (module.enable === undefined || !module.enable.map(setting => GM_getValue(setting, false)).includes(false))) {
                console.log(`${name}: 불러오는 중...`);
                module.start();
                console.log(`${name}: 로드됨 ${(performance.now() - start).toFixed(2)}ms\n\n`);
            }
        } catch (e) {
            console.error(`${name}: ${e}\n\n`);
        }
    }
});