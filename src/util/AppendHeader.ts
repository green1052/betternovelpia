import $ from "jquery";
import {HEADER_BAR} from "./Selectors";

export function appendHeader(contents: JQuery<HTMLElement>) {
    $(HEADER_BAR).children().eq(6).before(contents);
}