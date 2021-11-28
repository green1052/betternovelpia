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
            $(`img[src*="m_banner_list_03.png"]`).parent().parent().remove();

        if (/^\/viewer/.test(location.pathname))
            $(`img[src*="m_banner_list_04.png"]`).parent().parent().remove();

        if (/^\/freestory|plus/.test(location.pathname))
            $(`img[alt="자유연재 광고"]`).parent().parent().remove();
    }
} as Module;