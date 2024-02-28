const functionList: Array<() => void | Promise<void>> = [];

window.addEventListener("load", () => {
    unsafeWindow.novel_drawing &&=
        new Proxy(unsafeWindow.novel_drawing, {
            apply(target, thisArg, argumentsList) {
                Reflect.apply(target, thisArg, argumentsList);

                try {
                    for (const func of functionList) {
                        func();
                    }
                } catch {
                }
            }
        });
});

export function novelLoaded(func: () => void | Promise<void>) {
    if (!location.pathname.startsWith("/viewer/")) throw "is not viewer";

    functionList.push(func);
}