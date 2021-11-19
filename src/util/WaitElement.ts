export function waitElement(dom: HTMLElement, code: () => void | Promise<void>, timeout: number = 5000) {
    let isDone = false;

    const observer = new MutationObserver(() => {
        try {
            observer.disconnect();
            code();
        } finally {
            isDone = true;
        }
    });

    observer.observe(dom, {childList: true});

    setTimeout(() => {
        if (!isDone)
            observer.disconnect();
    }, timeout);
}