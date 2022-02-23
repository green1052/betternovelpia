import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    enable: ["NaviScrollHide"],
    config: {
        head: "스크롤 시 네비 숨기기",
        configs: {
            NaviScrollHide: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        let scrollTop = -1;

        $(NOVEL_BOX).on("scroll", (e) => {
            const currentScrollTop = e.currentTarget.scrollTop;
            const calc = Number((currentScrollTop - scrollTop).toFixed(0));

            scrollTop = currentScrollTop;

            if (toggle_navi === 0 && (calc > 0 && calc >= 5 || calc < 0 && calc <= -5))
                navi_view();
        });
    }
} as Module;