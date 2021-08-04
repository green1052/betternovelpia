import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("BetterSideView") || location.pathname.includes("/viewer/"))
        return;

    const div = $(`<div id="BetterSideView">`)
        .css("position", "fixed")
        .css("width", "100vw")
        .css("height", "100vh")
        .css("z-index", 2)
        .on("click", () => {
            $(document.body).removeClass("show-left");
            $("#BetterSideView").hide();
        })
        .hide();

    $(document.body).prepend(div);

    $("#naviconLeftMobile").on("click", () => {
        if (div.css("display") !== "none")
            return div.hide();

        if ($(document.body).hasClass("show-left"))
            div.show();
    });
}