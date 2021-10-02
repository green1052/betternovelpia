import $ from "jquery";

function hide(jquery: JQuery<HTMLElement>) {
    jquery
        .removeAttr("class")
        .removeAttr("style")
        .css("margin", "15px")
        .empty();
}

export default {
    enable: ["HideEvent"],
    start() {
        if (location.pathname === "/")
            return $("#slider-wrap[class*=mobile_show]").remove();

        if (location.pathname.includes("/contest_list")) {
            $(`div[style*="banner_freestory7.png"]`).parent().parent().remove();
            $(`span:contains("공모전 상금")`).parent().parent().remove();
        }

        if (location.pathname.includes("/freestory"))
            hide($(`div[class="mobile_show"][style*="banner_freestory6_mob.png"]`));

        if (location.pathname.includes("/plus"))
            hide($(`img[src*="plus_banner5.png"]`).parent().parent());

        $(`div.swiper-container[class*="mobile_show"]`).remove();

        hide($(`div[onclick*="/notice/all/view_171726"]`));
    }
} as Module;