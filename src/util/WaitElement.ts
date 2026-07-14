export function waitElement(element: HTMLElement | null, code: () => void | Promise<void>, timeout = 5000) {
    if (!element) return;

    if (element.childNodes.length > 0) {
        code();
        return;
    }

    const observer = new MutationObserver(() => {
        if (element.childNodes.length > 0) {
            observer.disconnect();
            code();
        }
    });

    observer.observe(element, {childList: true, subtree: true});

    setTimeout(() => observer.disconnect(), timeout);
}
