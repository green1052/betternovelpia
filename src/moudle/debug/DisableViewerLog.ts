import Config from "../../Config";

export default {Start};

function Start() {
    if (!Config.GetConfig("DisableViewLog") || !location.pathname.includes("/viewer/"))
        return;

    // @ts-ignore
    unsafeWindow.up_down_btn_view = function (option) {
        if (option == "on") {
            // @ts-ignore
            if (option_btn_comment == 1) {
                // @ts-ignore
                var currentPercentage = ($("#comment_box").scrollTop() / ($("#comment_load").outerHeight() - $("#comment_box").height())) * 100;
            } else {
                // @ts-ignore
                var currentPercentage = ($("#novel_box").scrollTop() / ($("#novel_text").outerHeight() - $("#novel_box").height())) * 100;
            }
            if (currentPercentage < 10) {
                $("#scroll_up_btn").hide();
                $("#scroll_down_btn").show();
                console.log("#scroll_down_btn - show;");
            } else if (currentPercentage > 90) {
                $("#scroll_up_btn").show();
                $("#scroll_down_btn").hide();
            } else {
                $("#scroll_up_btn").show();
                $("#scroll_down_btn").show();
            }
        } else {
            $("#scroll_up_btn").hide();
            $("#scroll_down_btn").hide();
        }
    };

    // @ts-ignore
    unsafeWindow.navi_view = function () {
        // @ts-ignore
        if (option_btn_comment != 1) {
            // @ts-ignore
            if (toggle_navi == 1) {
                $("#footer_bar").show();
                $("#header_bar").show();
                if (localStorage["viewer_paging"] != 1) {
                    up_down_btn_view("on");
                }
                // @ts-ignore
                toggle_navi = 0;
            } else {
                $("#footer_bar").hide();
                $("#header_bar").hide();
                $("#theme_box").hide();
                console.log("navi_view - off");
                up_down_btn_view("off");
                // @ts-ignore
                option_btn_theme = 0;
                $("#btn_theme").attr("src", "/img/new/viewer/btn_theme.png");
                // @ts-ignore
                toggle_navi = 1;
            }
        }
    };
}