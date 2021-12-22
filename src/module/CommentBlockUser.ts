import $ from "jquery";
import {waitElement} from "../util/WaitElement";
import toastr from "toastr";

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
        const oldCommentLoad = unsafeWindow.comment_load;

        unsafeWindow.comment_load = () => {
            oldCommentLoad();
            waitElement($("#comment_load").get(0)!, () => {
                for (const element of $(`div[class="row"][id*="comment_"] > div > table > tbody > tr:nth-child(3) > td`)) {
                    const $element = $(element);

                    $element
                        .append("<font style=color:#eee;font-size:11px>|</font>")
                        .append(`<font style=cursor:pointer;color:#bc143b;font-size:11px><font> 차단</font></font>`)
                        .on("click", () => {
                            const memberNo = /'\/user\/(\d*)';$/
                                .exec(
                                    $element
                                        .closest("tbody")
                                        .children("tr:nth-child(1)")
                                        .children("td")
                                        .children("span")
                                        .children("b")
                                        .attr("onclick")!
                                )?.[1];

                            $.ajax({
                                data: {"member_no": memberNo, "csrf": `${$("#csrf").val()}`},
                                type: "POST",
                                url: "/proc/member_block",
                                cache: false,
                                success: data => {
                                    switch (data.split("|")[0]) {
                                        case "on":
                                            toastr.info("차단되었습니다.", "댓글 유저 차단");
                                            break;
                                        case "off":
                                            toastr.info("차단이 해제되었습니다.", "댓글 유저 차단");
                                            break;
                                        case "login":
                                            toastr.info("로그인이 필요합니다.", "댓글 유저 차단");
                                            break;
                                    }
                                }
                            });
                        });
                }
            }, 10000);
        };
    }
} as Module;