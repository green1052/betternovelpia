export function hideElement(element: HTMLElement | null) {
    if (element === null || element === undefined) return;

    element.removeAttribute("class");
    element.removeAttribute("style");
    element.style.margin = "15px";
    element.innerHTML = "";
}