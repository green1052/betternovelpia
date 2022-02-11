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
            document.querySelector("div[class*=main-slide-wrapper][class*=mobile_show]")?.remove();
            return;
        }

        if (/^\/freestory/.test(location.pathname)) {
            document.querySelector("div.swiper-container[class*=mobile_show]")?.remove();
            document.querySelector(`div[class=""] > div[class*="swiper-container mobile_show"]`)?.remove();
            return;
        }

        hideElement(document.querySelector(`div[onclick*="/notice/all/view_171726"]`));
    }
} as Module;