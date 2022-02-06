import $ from "jquery";
import {hideElement} from "../util/HideElement";
import {novelLoad} from "../util/NovelLoad";

export default {
    enable: ["HideAd"],
    config: {
        head: "광고 숨기기",
        configs: {
            HideAd: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        document.querySelector("");

        if (location.pathname === "/")
            (document.querySelector("button[class*=detail-modal-24close]") as HTMLElement).click();

        if (/^\/mybook/.test(location.pathname))
            hideElement($(`img[alt="내서재 광고"]`).closest("div"));

        if (/^\/viewer\//.test(location.pathname)) {
            novelLoad(() => {
                document.querySelector("div[class=one-event-wrapper]")?.parentElement?.remove();
                document.querySelector(`img[src*="m_banner_list_04.png"]`)?.closest("div")?.remove();
            });

            document.querySelector("img[alt=댓글광고]")?.remove();
        }

        if (/^\/freestory|plus/.test(location.pathname))
            document.querySelector(`img[alt="자유연재 광고"]`)?.closest("div")?.remove();

        if (/^\/freestory/.test(location.pathname))
            hideElement($(`a[href="/viewer/304048"]`).children("div"));

        if (/^\/plus/.test(location.pathname))
            hideElement($(`a[href="/plus_shop"]`).children("div"));

        document.querySelector(`img[src*="won_m.gif"]`)?.remove();
    }
} as Module;