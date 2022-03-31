import $ from "jquery";
import {commentLoaded} from "../util/CommentLoaded";

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
        commentLoaded(() => {
            for (const element of $("#comment_load > div[class*=comment] > .comment_wrap > .comment_content > .comment_img")) {
                const $element = $(element);

                if (
                    $element.css("display") === "none" ||
                    $element.parent().children(".comment_text").text().length > 0 ||
                    $element.closest(".comment").attr("data-status") !== "1"
                ) continue;

                if (GM_getValue<boolean>("HideOnlyEmojiComment_Remove", false)) {
                    $element.closest(".comment").remove();
                    continue;
                }

                $element
                    .closest(".comment")
                    .attr("data-status", "0");

                const regDate = $element
                    .parent()
                    .children(".comment_regdate")
                    .nextAll();

                regDate
                    .parent()
                    .append(`<span style="color: #999;">노벨티콘만 있는 댓글 입니다.</span><br>`);

                regDate.remove();
            }
        });
    }
} as Module;