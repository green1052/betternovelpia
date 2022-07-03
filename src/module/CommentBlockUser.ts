import $ from "jquery";
import {commentLoaded} from "../util/CommentLoaded";

export default {
    include: /^\/viewer\//,
    enable: ["CommentBlockUser"],
    config: {
        head: "댓글에 차단 버튼 추가",
        configs: {
            CommentBlockUser: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        commentLoaded(() => {
            for (const element of $("#comment_load > div[class*=comment] > .comment_wrap > .comment_footer > div")) {
                const $element = $(element);

                if ($element.children(`span:contains("차단")`).length > 0) return;

                $element
                    .append("<span class=line>|</span>")
                    .append(`<span class="comment_option option_rpt">차단</span>`)
                    .on("click", () => {
                        const memberNo = /'\/user\/(\d*)';$/
                            .exec(
                                $element
                                    .parent()
                                    .parent()
                                    .children(".comment_header")
                                    .children(".user_name")
                                    .children("b")
                                    .attr("onclick")!
                            )?.[1];

                        $.ajax({
                            data: {member_no: memberNo, csrf: `${$("#csrf").val()}`},
                            type: "POST",
                            url: "/proc/member_block",
                            cache: false,
                            success: data => {
                                switch (data.split("|")[0]) {
                                    case "on":
                                        unsafeWindow.toastr.info("차단되었습니다.", "댓글 유저 차단");
                                        break;
                                    case "off":
                                        unsafeWindow.toastr.info("차단이 해제되었습니다.", "댓글 유저 차단");
                                        break;
                                    case "login":
                                        unsafeWindow.toastr.info("로그인이 필요합니다.", "댓글 유저 차단");
                                        break;
                                }
                            }
                        });
                    });
            }
        });
    }
} as Module;