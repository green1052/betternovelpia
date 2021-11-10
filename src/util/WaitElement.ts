export function waitElement(dom: HTMLElement, code: () => void | Promise<void>) {
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
    }, 5000);
}