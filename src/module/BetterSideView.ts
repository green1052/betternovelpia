import $ from "jquery";

export default {
    enable: ["BetterSideView"],
    config: {
        head: "사이드뷰 개선",
        configs: {
            BetterSideView: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        if (/^\/viewer\//.test(location.pathname))
            return;

        $(document.body)
            .prepend(
                $("<div id=BetterSideView>")
                    .css("display", "none")
                    .css("position", "fixed")
                    .css("width", "100vw")
                    .css("height", "100vh")
                    .css("z-index", 2)
                    .on("click", function () {
                        $(document.body).removeClass("show-left");
                        $(this).hide();
                    })
            );

        $("span#naviconLeftMobile").on("click", () => {
            const $BetterSideView = $("#BetterSideView");

            if ($(document.body).hasClass("show-left"))
                $BetterSideView.show();
            else
                $BetterSideView.hide();
        });
    }
} as Module;