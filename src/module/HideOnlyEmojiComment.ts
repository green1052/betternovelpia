import $ from "jquery";
import {waitElement} from "../util/WaitElement";

export default {
    include: /^\/viewer\//,
    enable: ["HideOnlyEmojiComment"],
    config: {
        head: "노벨티콘만 있는 댓글 숨기기",
        configs: {
            HideOnlyEmojiComment: {
                label: "활성화",
                type: "checkbox",
                default: false
            },
            HideOnlyEmojiComment_Remove: {
                label: "완전히 숨기기",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const oldCommentLoad = unsafeWindow.comment_load;

        unsafeWindow.comment_load = () => {
            oldCommentLoad();
            waitElement($("#comment_load").get(0)!, () => {
                for (const element of $(`div[class="row"][id*="comment_"] > div > table > tbody > tr:nth-child(2) > td`)) {
                    const $element = $(element);

                    if ($element.children(`div[id*="comment_text_"]`).text().length ||
                        $element.children("font:last").text() === "삭제된 댓글 입니다.") continue;

                    if (GM_getValue("HideOnlyEmojiComment_Remove", false)) {
                        $element.closest(".row").remove();
                        continue;
                    }

                    $element
                        .closest("div")
                        .css("background-color", "#ffc5c5");

                    $element
                        .children("font:last")
                        .nextAll()
                        .remove();

                    $(`<br><font style=color:#999>노벨티콘만 있는 댓글입니다.</font>`).insertAfter($element.children("font:last"));
                }
            }, 10000);
        };
    }
} as Module;