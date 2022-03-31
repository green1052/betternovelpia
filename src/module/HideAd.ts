import {hideElement} from "../util/HideElement";
import {novelLoaded} from "../util/NovelLoaded";
import $ from "jquery";

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
        if (/^\/mybook/.test(location.pathname))
            hideElement(document.querySelector(`img[src*=m_banner][alt="내서재 광고"]`)?.closest("div") as HTMLElement);

        if (/^\/viewer\//.test(location.pathname)) {
            novelLoaded(() => {
                setTimeout(() => {
                    document.querySelector(".ad_banner")?.remove();
                    $("img[alt=광고]").closest("div").remove();
                }, 500);
            });
        }

        if (/^\/ssul/.test(location.pathname))
            document.querySelector(`div.story_bnr`)?.remove();

        if (/^\/comic/.test(location.pathname))
            document.querySelector(`div.comic_bnr`)?.remove();

        if (/^\/freestory|plus/.test(location.pathname)) {
            for (const element of document.querySelectorAll(`img[alt="자유연재 광고"]`))
                element.closest("div")?.remove();
        }

        if (/^\/plus/.test(location.pathname))
            document.querySelector(`div[class="plus_bg mobile_show"]`)?.parentElement?.remove();

        if (!/^\/viewer\//.test(location.pathname)) {
            $(`img[alt="글 쓰고 부자되기"]`).parent().remove();
        }
    }
} as Module;