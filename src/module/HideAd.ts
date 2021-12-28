import $ from "jquery";
import {element} from "../util/Element";
import {NOVEL_DRAWING} from "../util/Selectors";

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
        function hide(jquery: JQuery<HTMLElement>) {
            jquery
                .removeAttr("class")
                .removeAttr("style")
                .css("margin", "15px")
                .empty();
        }

        if (/^\/mybook/.test(location.pathname))
            $(`img[alt="내서재 광고"]`).closest("div").remove();

        if (/^\/viewer\//.test(location.pathname)) {
            element($(NOVEL_DRAWING), () => {
                $(`img[src*="m_banner_list_04.png"]`).closest("div").remove();
            });

            $(`img[alt="댓글광고"]`).remove();
        }

        if (/^\/freestory|plus/.test(location.pathname))
            $(`img[alt="자유연재 광고"]`).closest("div").remove();

        if (/^\/freestory/.test(location.pathname))
            hide($(`a[href="/viewer/304048"]`).children("div"));

        if (/^\/plus/.test(location.pathname))
            hide($(`a[href="/plus_shop"]`).children("div"));
    }
} as Module;