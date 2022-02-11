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
        if (location.pathname === "/")
            setTimeout(() => {
                (document.querySelector("button[class*=detail-modal-24close]") as HTMLElement)?.click();
            }, 500);

        if (/^\/mybook/.test(location.pathname))
            hideElement(document.querySelector(`img[src*=m_banner][alt="내서재 광고"]`)?.closest("div") as HTMLElement);

        if (/^\/viewer\//.test(location.pathname)) {
            novelLoad(() => {
                document.querySelector("div[class=one-event-wrapper]")?.parentElement?.remove();
                document.querySelector(`img[src*="m_banner_list_04.png"]`)?.closest("div")?.remove();
            });

            document.querySelector("img[alt=댓글광고]")?.remove();
        }

        if (/^\/freestory|plus/.test(location.pathname)) {
            for (const element of document.querySelectorAll(`img[alt="자유연재 광고"]`))
                element.closest("div")?.remove();
        }

        if (/^\/plus/.test(location.pathname))
            document.querySelector(`div[class="plus_bg mobile_show"]`)?.parentElement?.remove();

        if (!/^\/viewer\//.test(location.pathname))
            document.querySelector(`img[src*="won_m.gif"]`)?.remove();
    }
} as Module;