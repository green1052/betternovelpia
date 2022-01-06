import $ from "jquery";
import {hideElement} from "../util/HideElement";

export default {
    enable: ["HideEvent"],
    config: {
        head: "이벤트 숨기기",
        configs: {
            HideEvent: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        if (location.pathname === "/") {
            $(`div[class*="main-slide-wrapper"][class*="mobile_show"]`).remove();
            return;
        }

        $(`div.swiper-container[class*="mobile_show"]`).remove();
        hideElement($(`div[onclick*="/notice/all/view_171726"]`));
    }
} as Module;