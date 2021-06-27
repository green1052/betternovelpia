export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("BetterSideView") || location.pathname.includes("/viewer/"))
        return;

    document.querySelector(".am-navicon")?.addEventListener("click", () => {
        const BetterSideView = document.querySelector("#BetterSideView");

        if (BetterSideView)
            return BetterSideView.remove();

        const sideView = document.body.classList.contains("show-left");

        if (sideView)
            return;

        const div = document.createElement("div");
        div.id = "BetterSideView";
        div.style.cssText = "position: fixed; width: 100vw; height: 100vh; z-index: 2";

        div.onclick = () => {
            document.querySelector("#BetterSideView")?.remove();
            document.body.classList.remove("show-left");
        };

        document.body.prepend(div);
    });
}