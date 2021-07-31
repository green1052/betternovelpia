export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("HideEvent"))
        return;

    if (location.pathname === "/")
        return $("#slider-wrap[class*=mobile_show]").remove();

    if (location.pathname.includes("/freestory"))
        $(`img[src*="banner_freestory1_mob.png"]`)
            .parent()
            .parent()
            .removeAttr("class")
            .removeAttr("style")
            .css("margin", "15px")
            .empty();

    if (location.pathname.includes("/plus"))
        $(`img[src*="plus_banner5.png"]`)
            .parent()
            .removeAttr("class")
            .removeAttr("style")
            .css("margin", "15px")
            .children()
            .remove();

    $(`div[onclick="$('.loads').show();location='/notice/all/view_171726';"]`)
        .removeAttr("class")
        .removeAttr("style")
        .css("margin", "15px")
        .empty();
}