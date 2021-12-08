import $ from "jquery";
import {SIDE_LEFT} from "./Selectors";

export function appendSide(contents: JQuery<HTMLElement> | string) {
    $(SIDE_LEFT).append(contents);
}