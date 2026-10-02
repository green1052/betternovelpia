import {unsafeWindow} from "$";
import {commentLoaded} from "../core/site";
import {defineModule} from "../core/module";
import ky from "ky";

const BLOCK_MESSAGES: Record<string, string> = {
    on: "차단되었습니다.",
    off: "차단이 해제되었습니다.",
    login: "로그인이 필요합니다."
};

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

                if (hasBlockSpan) continue;

                element.insertAdjacentHTML("beforeend", `<span class=line>|</span><span class="comment_option option_rpt">차단</span>`);

                const blockButton = element.lastElementChild;
                if (!blockButton) continue;

                blockButton.addEventListener("click", () => {
                    const commentWrap = element.parentElement?.parentElement;
                    const userNameB = commentWrap?.querySelector(".comment_header .user_name b");
                    const onclickAttr = userNameB?.getAttribute("onclick") ?? "";

                    const memberNo = /'\/user\/(\d*)';$/.exec(onclickAttr)?.[1];

                    if (!memberNo) return;

                    const csrf = document.querySelector<HTMLInputElement>("#csrf")?.value ?? "";

                    ky
                        .post("/proc/member_block", {body: new URLSearchParams({member_no: memberNo, csrf})})
                        .text()
                        .then((data) => {
                            const message = BLOCK_MESSAGES[data.split("|")[0] ?? ""];
                            if (message) unsafeWindow.toastr.info(message, "댓글 유저 차단");
                        });
                });
            }
        });
    }
});
