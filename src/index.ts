import {asObject as modulesTs} from "./module/**/*.ts";
import {asObject as modulesTsx} from "./module/**/*.tsx";

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

const modules = {...modulesTs, ...modulesTsx};

const moduleList: { name: string, module: Module }[] = Object.entries(modules)
    .map(([path, mod]) => ({
        name: /(\w*)\.tsx?$/i.exec(path)?.[1] ?? path,
        module: mod.default as Module
    }));

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

for (const { name, module } of moduleList) {
    if (!module || typeof module.start !== "function") continue;

    ModulesInfo.modules[module.property ?? "end"].push({
        name,
        module
    });

    if (module.config)
        ModulesInfo.configs.push(module.config);
}

Promise.all(ModulesInfo.modules.start.map((moduleInfo) => start(moduleInfo)));

window.addEventListener("load", () => {
    Promise.all(ModulesInfo.modules.end.map((moduleInfo) => start(moduleInfo)));
});

unsafeWindow.setInterval = new Proxy(unsafeWindow.setInterval, {
    apply(target, thisArg, argArray) {
        if (argArray[2].includes("user-select")) {
            return;
        }
        return Reflect.apply(target, thisArg, argArray);
    }
});