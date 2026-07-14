import {asObject as modulesTs} from "./module/**/*.ts";
import {asObject as modulesTsx} from "./module/**/*.tsx";
import {registeredModules, configs} from "./util/registry";
import {resolveSettings} from "./util/config";

for (const [path, mod] of Object.entries({...modulesTs, ...modulesTsx})) {
    const module = mod.default as Module;
    if (!module || typeof module.start !== "function") continue;

    const name = /(\w*)\.tsx?$/i.exec(path)?.[1] ?? path;
    registeredModules.push({name, module});

    if (module.config) configs.push(module.config);
}

function runModule({name, module}: ModuleInfo) {
    const startTime = performance.now();

    try {
        const included = !module.include || module.include.test(location.pathname);
        const excluded = !!module.exclude?.test(location.pathname);
        const enabled = !module.enable?.length || module.enable.every(s => GM_getValue<boolean>(s, false));

        if (included && !excluded && enabled) {
            const settings = module.config ? resolveSettings(module.config.configs) : {};
            module.start(settings);
            console.log(`${name}: ${performance.now() - startTime | 0}ms`);
        }
    } catch (e) {
        console.error(`${name}:`, e);
    }
}

for (const m of registeredModules) {
    if (m.module.runAt === "document-start") runModule(m);
}

window.addEventListener("load", () => {
    for (const m of registeredModules) {
        if (m.module.runAt !== "document-start") runModule(m);
    }
});

unsafeWindow.setInterval = new Proxy(unsafeWindow.setInterval, {
    apply(target, thisArg, argArray) {
        const third = argArray[2];
        if (typeof third === "string" && third.includes("user-select")) {
            return 0 as unknown as ReturnType<typeof setInterval>;
        }
        return Reflect.apply(target, thisArg, argArray);
    }
});
