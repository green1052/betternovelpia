import urlRegex from "url-regex-safe";
import $ from "jquery";
import {NOVEL_DRAWING} from "../util/Selectors";
import {element} from "../util/Element";

export default {
    include: /^\/viewer\//,
    enable: ["UrlPrettier"],
    config: {
        head: "URL a href 적용",
        configs: {
            UrlPrettier: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        element($(NOVEL_DRAWING), () => {
            const match = $(NOVEL_DRAWING).text().match(urlRegex({strict: true}));

            match?.forEach(str =>
                $(`${NOVEL_DRAWING} font:contains("${str}")`).wrapAll(`<a target="_blank" href="${str}">`)
            );
        });
    }
} as Module;