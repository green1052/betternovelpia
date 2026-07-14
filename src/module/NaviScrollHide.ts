import {HEADER_BAR, NOVEL_BOX} from "../util/Selectors";
import {defineModule} from "../util/config";

export default defineModule({
    include: /^\/viewer\//,
    enable: ["NaviScrollHide"],
    config: {
        head: "스크롤 시 네비 숨기기",
        configs: {
            NaviScrollHide: {label: "활성화", type: "checkbox", default: false}
        }
    },
    start() {
        let scrollTop = -1;

        document.querySelector(NOVEL_BOX)?.addEventListener("scroll", (e) => {
            const currentScrollTop = (e.currentTarget as HTMLElement).scrollTop;
            const calc = Number((currentScrollTop - scrollTop).toFixed(0));

            scrollTop = currentScrollTop;

            const headerEl = document.querySelector(HEADER_BAR);
            if (headerEl && getComputedStyle(headerEl).display === "block" && (calc > 0 && calc >= 5 || calc < 0 && calc <= -5))
                unsafeWindow.navi_view();
        });
    }
});
