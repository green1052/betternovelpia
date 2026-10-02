import {unsafeWindow} from "$";
import {type Module, type ModuleInfo, registeredModules, resolveSettings} from "./core/module";

const modules = import.meta.glob("./modules/*.{ts,tsx}", {eager: true, import: "default"}) as Record<string, Module>;

for (const [path, module] of Object.entries(modules)) {
    if (!module || typeof module.start !== "function") continue;

    const name = /(\w*)\.tsx?$/i.exec(path)?.[1] ?? path;
    registeredModules.push({name, module});
}

function runModule({name, module}: ModuleInfo) {
    const startTime = performance.now();

    try {
        if (module.include && !module.include.test(location.pathname)) return;
        if (module.exclude?.test(location.pathname)) return;

        const settings = module.config ? resolveSettings(module.config.configs) : {};
        if (module.enable && !module.enable.every(key => settings[key])) return;

        module.start(settings);
        console.log(`${name}: ${performance.now() - startTime | 0}ms`);
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
