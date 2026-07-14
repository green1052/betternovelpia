import {commentLoaded} from "../util/CommentLoaded";
import {defineModule} from "../util/config";
import ky from "ky";

export default defineModule({
    include: /^\/viewer\//,
    enable: ["CommentBlockUser"],
    config: {
        head: "댓글에 차단 버튼 추가",
        configs: {
            CommentBlockUser: {label: "활성화", type: "checkbox", default: false}
        }
    },
    start() {
        commentLoaded(() => {
            for (const element of document.querySelectorAll("#comment_load > div[class*=comment] > .comment_wrap > .comment_footer > div")) {
                const hasBlockSpan = Array.from(element.children).some(
                    child => child.tagName === "SPAN" && child.textContent?.includes("차단")
                );

                if (hasBlockSpan) return;

                element.insertAdjacentHTML("beforeend", "<span class=line>|</span>");
                element.insertAdjacentHTML("beforeend", `<span class="comment_option option_rpt">차단</span>`);
                element.addEventListener("click", () => {
                    const commentWrap = element.parentElement?.parentElement;
                    const userNameB = commentWrap?.querySelector(".comment_header .user_name b");
                    const onclickAttr = userNameB?.getAttribute("onclick") ?? "";

                    const memberNo = /'\/user\/(\d*)';$/.exec(onclickAttr)?.[1];

                    if (!memberNo) return;

                    const params = new URLSearchParams();
                    params.set("member_no", memberNo);
                    const csrfEl = document.querySelector("#csrf") as HTMLInputElement | HTMLTextAreaElement | null;
                    params.set("csrf", csrfEl?.value ?? "");

                    ky
                        .post("/proc/member_block", {
                            body: params
                        })
                        .text()
                        .then((data) => {
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
                        });
                });
            }
        });
    }
});
