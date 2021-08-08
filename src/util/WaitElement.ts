export function waitElement(dom: HTMLElement, code: Function) {
    if (!dom)
        return;

    const observer = new MutationObserver(() => {
        observer.disconnect();
        code();
    });

    observer.observe(dom, {childList: true});
}