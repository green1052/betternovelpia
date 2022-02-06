export function waitElement(element: HTMLElement | null, code: () => void | Promise<void>, timeout: number = 5000) {
    if (element === null)
        throw "element is null";

    let isDone = false;

    const observer = new MutationObserver(() => {
        try {
            code();
        } finally {
            observer.disconnect();
            isDone = true;
        }
    });

    observer.observe(element, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true
    });

    setTimeout(() => {
        if (!isDone)
            observer.disconnect();
    }, timeout);
}