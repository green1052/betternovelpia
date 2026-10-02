import {unsafeWindow} from "$";

export const SIDE_LEFT = "#m-sidemenu .sidemenu-support";
export const HEADER_BAR = "#header_bar";
export const FOOTER_BAR = "#footer_bar";
export const NOVEL_BOX = "#novel_box";
export const NOVEL_EP = ".menu-top-tag";
export const EP_LIST = "#episode_list";

const hooks = new Map<string, Array<() => void | Promise<void>>>();
const hooked = new Set<string>();

export function hookSiteFunction(
    fnName: string,
    callback: () => void | Promise<void>,
    options: {
        onWindowLoad?: boolean;
        delay?: number;
        requireViewer?: boolean;
    } = {}
) {
    if (options.requireViewer && !location.pathname.startsWith("/viewer/"))
        throw new Error(`${fnName} hook requires viewer page`);

    const list = hooks.get(fnName);
    if (list) list.push(callback);
    else hooks.set(fnName, [callback]);

    if (hooked.has(fnName)) return;
    hooked.add(fnName);

    const setupHook = () => {
        const original = (unsafeWindow as unknown as Record<string, unknown>)[fnName];
        if (typeof original !== "function") return;

        (unsafeWindow as unknown as Record<string, (...args: unknown[]) => unknown>)[fnName] = function (this: unknown, ...args: unknown[]) {
            Reflect.apply(original as (...args: unknown[]) => unknown, this, args);

            const callbacks = hooks.get(fnName);
            if (!callbacks) return;

            const run = () => {
                for (const fn of callbacks) {
                    try {
                        fn();
                    } catch (e) {
                        console.error(`${fnName} hook:`, e);
                    }
                }
            };

            if (options.delay) setTimeout(run, options.delay);
            else run();
        };
    };

    if (options.onWindowLoad)
        window.addEventListener("load", setupHook, {once: true});
    else
        setupHook();
}

export function novelLoaded(func: () => void | Promise<void>) {
    hookSiteFunction("novel_drawing", func, {requireViewer: true, onWindowLoad: true});
}

export function commentLoaded(func: () => void | Promise<void>) {
    hookSiteFunction("get_comment_load", func, {requireViewer: true, delay: 500});
}
