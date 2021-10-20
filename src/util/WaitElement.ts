export function waitElement(dom: HTMLElement | undefined, code: () => void | Promise<void>) {
    if (!dom)
        return;

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