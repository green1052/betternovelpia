export const ModulesInfo: {
    modules: {
        start: ModuleInfo[],
        end: ModuleInfo[]
    },
    configs: Configs[]
} = {
    modules: {
        start: [],
        end: []
    },
    configs: []
};

const context = require.context("./module/", true, /\.tsx?$/);

function start(moduleInfo: ModuleInfo) {
    const module = moduleInfo.module;

    const start = performance.now();

    try {
        if ((module.include === undefined || module.include.test(location.pathname)) &&
            (module.exclude === undefined || !module.exclude.test(location.pathname)) &&
            (module.enable === undefined || module.enable.every(setting => GM_getValue<boolean>(setting, false)))) {
            module.start();
            console.log(`${moduleInfo.name}: 로드됨 ${(performance.now() - start).toFixed(2)}ms`);
        }
    } catch (e) {
        console.error(`${moduleInfo.name}: ${e}`);
    }
}

for (const key of context.keys()) {
    const name = /(\w*)\.tsx?$/gi.exec(key)?.[1] ?? key;

    const module: Module = context(key).default;

    if (!module || typeof module.start !== "function") continue;

    ModulesInfo.modules[module.property ?? "end"].push({
        name,
        module
    });

    if (module.config)
        ModulesInfo.configs.push(module.config);
}

for (const moduleInfo of ModulesInfo.modules.start) start(moduleInfo);

window.onload = () => {
    for (const moduleInfo of ModulesInfo.modules.end) {
        start(moduleInfo);
    }
};