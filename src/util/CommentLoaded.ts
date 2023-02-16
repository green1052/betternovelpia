const functionList: Array<() => void | Promise<void>> = [];

export function commentLoaded(func: () => void | Promise<void>) {
    if (!location.pathname.startsWith("/viewer/")) throw "is not viewer";

    functionList.push(func);

    unsafeWindow.get_comment_load = new Proxy(unsafeWindow.get_comment_load, {
        apply(target, thisArg, argArray) {
            Reflect.apply(target, thisArg, argArray);

            setTimeout(() => {
                for (const func of functionList) {
                    func();
                }
            }, 500);
        }
    });
}