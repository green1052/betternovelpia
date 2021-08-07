import $ from "jquery";

export default {start};

function hide(jquery: JQuery) {
    jquery.removeAttr("class")
        .removeAttr("style")
        .css("margin", "15px")
        .empty();
}

function start() {
    if (!GM_config.get("HideEvent"))
        return;

    if (location.pathname === "/")
        return $("#slider-wrap[class*=mobile_show]").remove();

    if (location.pathname.includes("/freestory"))
        hide($(`img[src*="banner_freestory1_mob.png"]`).parent().parent());

    if (location.pathname.includes("/plus"))
        hide($(`img[src*="plus_banner5.png"]`).parent());

    $(`div.swiper-container[class*="mobile_show"]`).remove();

    hide($(`div[onclick="$('.loads').show();location='/notice/all/view_171726';"]`));
}