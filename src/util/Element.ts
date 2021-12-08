import {waitElement} from "./WaitElement";

export function element($element: JQuery<HTMLElement>, code: () => void | Promise<void>, timeout: number = 500) {
    if ($element.children().length > 0) {
        code();
        return;
    }

    waitElement($element.get(0)!, code, timeout);
}