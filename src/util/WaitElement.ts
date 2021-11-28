export function waitElement(dom: HTMLElement, code: () => void | Promise<void>, timeout: number = 5000) {
    if (!dom) return;

    let isDone = false;

    const observer = new MutationObserver(() => {
        try {
            code();
        } finally {
            observer.disconnect();
            isDone = true;
        }
    });

    observer.observe(dom, {
        childList: true,
        attributes: true,
        characterData: true
    });

    setTimeout(() => {
        if (!isDone)
            observer.disconnect();
    }, timeout);
}