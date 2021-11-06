import urlRegex from "url-regex-safe";
import {waitElement} from "../util/WaitElement";
import $ from "jquery";
import {NOVEL_DRAWING} from "../util/Selectors";

export default {
    url: /^\/viewer\//,
    enable: ["UrlPrettier"],
    start() {
        function matched() {
            const match = $(NOVEL_DRAWING).text().match(urlRegex());

            match?.forEach(str =>
                $(`${NOVEL_DRAWING} font:contains("${str}")`).wrapAll(`<a target="_blank" href="${str}">`)
            );
        }

        if ($(NOVEL_DRAWING).children().length > 0) {
            matched();
            return;
        }

        waitElement($(NOVEL_DRAWING).get(0), matched);
    }
} as Module;