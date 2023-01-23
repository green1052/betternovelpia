const functionList: Array<() => void | Promise<void>> = [];

unsafeWindow.novel_drawing &&=
    new Proxy(unsafeWindow.novel_drawing, {
        apply(target, thisArg, argumentsList) {
            Reflect.apply(target, thisArg, argumentsList);

            for (const func of functionList) {
                func();
            }
        }
    });

export function novelLoaded(func: () => void | Promise<void>) {
    if (!location.pathname.startsWith("/viewer/")) throw "is not viewer";

    functionList.push(func);
}