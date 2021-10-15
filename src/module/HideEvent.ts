import $ from "jquery";

export default {
    enable: ["HideEvent"],
    start() {
        function hide(jquery: JQuery<HTMLElement>) {
            jquery
                .removeAttr("class")
                .removeAttr("style")
                .css("margin", "15px")
                .empty();
        }

        if (location.pathname === "/") {
            $("#slider-wrap[class*=mobile_show]").remove();
            return;
        }

        if (/^\/contest_list/.test(location.pathname)) {
            $(`div[style*="banner_freestory9.png"]`).parent().parent().remove();
            $(`span:contains("공모전 상금")`).parent().parent().remove();
        }

        if (/^\/freestory/.test(location.pathname))
            hide($(`div[class="mobile_show"][style*="banner_freestory6_mob.png"]`));

        if (/^\/plus/.test(location.pathname))
            hide($(`img[src*="plus_banner5.png"]`).parent().parent());

        $(`div.swiper-container[class*="mobile_show"]`).remove();

        hide($(`div[onclick*="/notice/all/view_171726"]`));
    }
} as Module;