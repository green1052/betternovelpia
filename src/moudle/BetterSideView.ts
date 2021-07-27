export default {Start};

function Start() {
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
        const BetterSideView = $("#BetterSideView");

        if (BetterSideView.css("display") !== "none")
            return BetterSideView.hide();

        if ($(document.body).hasClass("show-left"))
            return;

        BetterSideView.show();
    });
}