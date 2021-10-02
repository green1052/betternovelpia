import urlRegex from "url-regex-safe";
import {waitElement} from "../util/WaitElement";
import $ from "jquery";
import {NOVEL_DRAWING} from "../util/Selectors";

function matched() {
    const match = $(NOVEL_DRAWING).text().match(urlRegex({strict: false}));

    match?.forEach(str => {
        $(`${NOVEL_DRAWING} font:contains("${str}")`)
            .wrapAll(`<a target="_blank" href="${str}">`);
    });
}

export default {
    url: /\/viewer\//,
    enable: ["UrlPrettier"],
    start() {
        if ($(NOVEL_DRAWING).children().length > 0) {
            matched();
            return;
        }

        waitElement($(NOVEL_DRAWING).get(0), () => matched());
    }
} as Module;