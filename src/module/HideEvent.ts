import $ from "jquery";

export default {
    enable: ["HideEvent"],
    config: {
        head: "이벤트 숨기기",
        configs: {
            HideEvent: {
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

        if (location.pathname === "/") {
            $("#slider-wrap[class*=mobile_show]").remove();
            return;
        }

        if (/^\/contest_final_list/.test(location.pathname)) {
            $(`div[style*="banner_contest_review_m.png"]`).parent().parent().remove();
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