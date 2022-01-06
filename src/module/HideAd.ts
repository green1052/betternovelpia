import $ from "jquery";
import {element} from "../util/Element";
import {NOVEL_DRAWING} from "../util/Selectors";
import {hideElement} from "../util/HideElement";

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
            hideElement($(`img[alt="내서재 광고"]`).closest("div"));

        if (/^\/viewer\//.test(location.pathname)) {
            element($(NOVEL_DRAWING), () => {
                setTimeout(() => {
                    $(`img[src*="m_banner_list_04.png"]`).closest("div").remove();
                }, 500);
            });

            $(`img[alt="댓글광고"]`).remove();
        }

        if (/^\/freestory|plus/.test(location.pathname))
            $(`img[alt="자유연재 광고"]`).closest("div").remove();

        if (/^\/freestory/.test(location.pathname))
            hideElement($(`a[href="/viewer/304048"]`).children("div"));

        if (/^\/plus/.test(location.pathname))
            hideElement($(`a[href="/plus_shop"]`).children("div"));
    }
} as Module;