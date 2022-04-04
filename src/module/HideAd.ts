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
        if (location.pathname === "/")
            setTimeout(() => {
                (document.querySelector("span[class=detail-modal-72close]") as HTMLElement)?.click();
            }, 500);

        if (/^\/mybook/.test(location.pathname)) {
            hideElement(document.querySelector(".mybook_contest_bnr"));
            hideElement(document.querySelector(`img[src*="_m"][alt="내서재 광고"]`)?.closest("div") as HTMLElement);
        }

        if (/^\/viewer\//.test(location.pathname)) {
            novelLoaded(() => {
                setTimeout(() => {
                    document.querySelector(".ad_banner")?.remove();
                    document.querySelector("img[alt=광고]")?.closest("div")?.remove();
                }, 500);
            });
        }

        if (/^\/ssul/.test(location.pathname))
            document.querySelector(`div.story_bnr`)?.remove();

        if (/^\/comic/.test(location.pathname))
            document.querySelector(`div.comic_bnr`)?.remove();

        if (/^\/freestory|plus/.test(location.pathname))
            for (const element of document.querySelectorAll(`img[alt="자유연재 광고"]`))
                element.closest("div")?.remove();

        if (/^\/contest_list/.test(location.pathname))
            hideElement(document.querySelector(`div[style*="list_top_m.jpg"]`)?.parentElement?.parentElement!);

        if (/^\/plus/.test(location.pathname))
            document.querySelector(`div[class="plus_bg mobile_show"]`)?.parentElement?.remove();

        if (!/^\/viewer\//.test(location.pathname))
            $(`img[alt="공모전 참여하기"]`).parent().remove();
    }
} as Module;