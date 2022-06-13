import {hideElement} from "../util/HideElement";
import {novelLoaded} from "../util/NovelLoaded";

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
                (document.querySelector("span[class=detail-modal-72close]") as HTMLElement)?.click();
            }, 500);

        if (/^\/mybook/.test(location.pathname))
            hideElement(document.querySelector(`img[src*="m_"][alt="내서재 광고"]`)?.closest("div") as HTMLElement);

        if (/^\/viewer\//.test(location.pathname)) {
            unsafeWindow.get_ad_banner = () => {
            };

            novelLoaded(() => {
                document.querySelector("img[alt=광고]")?.closest("div")?.remove();
            });
        }

        if (/^\/ssul/.test(location.pathname))
            document.querySelector(`div.story_bnr`)?.remove();

        if (/^\/comic/.test(location.pathname))
            document.querySelector(`div.comic_bn_m`)?.remove();

        if (/^\/freestory|plus/.test(location.pathname))
            for (const element of document.querySelectorAll(`img[alt="자유연재 광고"]`))
                element.closest("div")?.remove();

        if (/^\/plus/.test(location.pathname))
            document.querySelector(`div[class="plus_bg mobile_show"]`)?.parentElement?.remove();
    }
} as Module;