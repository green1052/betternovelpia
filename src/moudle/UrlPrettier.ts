import urlRegex from "url-regex";
import {waitElement} from "../util/WaitElement";
import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("UrlPrettier") || !location.pathname.includes("/viewer/"))
        return;

    waitElement($("#novel_drawing").get(0), () => {
        const novelDrawing = $("#novel_drawing");

        for (const str of novelDrawing.text().match(urlRegex({strict: false})) ?? []) {
            $(`#novel_drawing font:contains("${str}")`)
                .wrapAll(`<a target="_blank" href="${str}">`);
        }
    });
}