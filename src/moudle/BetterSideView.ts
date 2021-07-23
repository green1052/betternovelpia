export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("BetterSideView") || location.pathname.includes("/viewer/"))
        return;

    const div = $(`<div id="BetterSideView">`);
    div.css("position", "fixed");
    div.css("width", "100vw");
    div.css("height", "100vh");
    div.css("z-index", "2");
    div.on("click", () => {
        $(document.body).removeClass("show-left");
        $("#BetterSideView").hide();
    });

    div.hide();

    $(document.body).prepend(div);

    $(".am-navicon").on("click", () => {
        const BetterSideView = $("#BetterSideView");

        if (BetterSideView.css("display") !== "none")
            return BetterSideView.hide();

        if ($(document.body).hasClass("show-left"))
            return;

        BetterSideView.show();
    });
}