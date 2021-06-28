export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("BetterSideView") || location.pathname.includes("/viewer/"))
        return;

    $(".am-navicon").on("click", () => {
        const BetterSideView = $("#BetterSideView");

        if (BetterSideView.length > 0)
            return BetterSideView.remove();

        if ($(document.body).hasClass("show-left"))
            return;

        const div = document.createElement("div");
        div.id = "BetterSideView";
        div.style.position = "fixed";
        div.style.width = "100vw";
        div.style.height = "100vh";
        div.style.zIndex = "2";

        div.onclick = () => {
            $("#BetterSideView").remove();
            $(document.body).removeClass("show-left");
        };

        document.body.prepend(div);
    });
}