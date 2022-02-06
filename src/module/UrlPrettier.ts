import urlRegex from "url-regex-safe";
import $ from "jquery";
import {NOVEL_DRAWING} from "../util/Selectors";
import {element} from "../util/Element";

export default {
    include: /^\/(novel|viewer)\//,
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
        const warpAll = (selector: string | HTMLElement) => {
            const element2 = typeof selector === "string"
                ? document.querySelector(selector) as HTMLElement
                : selector;

            if (element2 === null) return;

            const $element2 = $(element2);

            element(element2, () => {
                setTimeout(() => {
                    const match = $(element2).text().match(urlRegex());

                    if (!match) return;

                    for (const str of match)
                        $element2
                            .html((index, html) =>
                                html.replace(str, `<a href=${str} target=_blank>${str}</a>`)
                            );
                }, 500);
            });
        };

        if (/^\/novel\//.test(location.pathname)) {
            for (const element of document.querySelectorAll(`.more_info > td:nth-child(2) font`))
                warpAll(element as HTMLElement);

            return;
        }

        warpAll(NOVEL_DRAWING);
        warpAll("#writer_comments_box");

        const oldCommentLoad = unsafeWindow.get_comment_load;

        unsafeWindow.get_comment_load = (comment_re_no = 0, comment_ori_no = 0) => {
            oldCommentLoad(comment_re_no, comment_ori_no);

            setTimeout(() => {
                for (const element of $("div.comment_text")) {
                    const $element = $(element);

                    const match = $element.text().match(urlRegex());

                    if (!match) return;

                    for (const str of match) {
                        if ($element.html().includes(`<a href=${str} target=_blank>${str}</a>`)) continue;

                        $element
                            .html((index, html) =>
                                html.replace(str, `<a href=${str} target=_blank>${str}</a>`)
                            );
                    }
                }
            }, 500);
        };
    }
} as Module;