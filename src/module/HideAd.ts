import $ from "jquery";

export default {
    enable: ["HideAd"],
    start() {
        if (/^\/mybook/.test(location.pathname))
            $(`img[src*="m_banner_list_03.png"]`).parent().parent().remove();

        if (/^\/viewer/.test(location.pathname))
            $(`img[src*="m_banner_list_04.png"]`).parent().parent().remove();
    }
} as Module;