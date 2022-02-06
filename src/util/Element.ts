import {waitElement} from "./WaitElement";

export function element(element: HTMLElement | null, code: () => void | Promise<void>, timeout: number = 5000) {
    if (element === null)
        throw "element is null";

    if (element.childNodes.length > 0) {
        code();
        return;
    }

    waitElement(element, code, timeout);
}