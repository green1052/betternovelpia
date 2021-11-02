import $ from "jquery";

export default {
    enable: ["BetterSideView"],
    start() {
        if (/^\/viewer\//.test(location.pathname))
            return;

        const $body = $(document.body);

        const div = $("<div id=BetterSideView>")
            .css("display", "none")
            .css("position", "fixed")
            .css("width", "100vw")
            .css("height", "100vh")
            .css("z-index", 2)
            .on("click", () => {
                $body.removeClass("show-left");
                div.hide();
            });

        $(document.body).prepend(div);

        $("#naviconLeftMobile").on("click", () => {
            if (div.css("display") !== "none") {
                div.hide();
                return;
            }

            if ($body.hasClass("show-left"))
                div.show();
        });
    }
} as Module;