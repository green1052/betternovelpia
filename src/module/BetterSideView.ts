import $ from "jquery";

export default {
    enable: ["BetterSideView"],
    start() {
        if (/\/viewer\//.test(location.href))
            return;

        const div = $(`<div id="BetterSideView">`)
            .css("display", "none")
            .css("position", "fixed")
            .css("width", "100vw")
            .css("height", "100vh")
            .css("z-index", 2)
            .on("click", () => {
                $(document.body).removeClass("show-left");
                div.hide();
            });

        $(document.body).prepend(div);

        $("#naviconLeftMobile").on("click", () => {
            if (div.css("display") !== "none")
                return div.hide();

            if ($(document.body).hasClass("show-left"))
                div.show();
        });
    }
} as Module;