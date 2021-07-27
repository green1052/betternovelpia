export default {Start};

function Start() {
    if (!GM_config.get("DisableViewLog") || !location.pathname.includes("/viewer/"))
        return;

    unsafeWindow.up_down_btn_view = function (option: any) {
        if (option !== "on") {
            $("#scroll_up_btn").hide();
            return $("#scroll_down_btn").hide();
        }

        let currentPercentage;

        if (option_btn_comment == 1)
            currentPercentage = ($("#comment_box").scrollTop()! / ($("#comment_load").outerHeight()! - $("#comment_box").height()!)) * 100;
        else
            currentPercentage = ($("#novel_box").scrollTop()! / ($("#novel_text").outerHeight()! - $("#novel_box").height()!)) * 100;

        if (currentPercentage < 10) {
            $("#scroll_up_btn").hide();
            $("#scroll_down_btn").show();
        } else if (currentPercentage > 90) {
            $("#scroll_up_btn").show();
            $("#scroll_down_btn").hide();
        } else {
            $("#scroll_up_btn").show();
            $("#scroll_down_btn").show();
        }
    };

    unsafeWindow.navi_view = function () {
        if (option_btn_comment == 1)
            return;

        const footer = $("#footer_bar");
        const header = $("#header_bar");

        if (toggle_navi == 1) {
            footer.show();
            header.show();

            if (localStorage["viewer_paging"] != 1)
                up_down_btn_view("on");

            toggle_navi = 0;

            return;
        }

        footer.hide();
        header.hide();

        $("#theme_box").hide();

        up_down_btn_view("off");

        option_btn_theme = 0;

        $("#btn_theme")
            .attr("src", "/img/new/viewer/btn_theme.png");

        toggle_navi = 1;
    };
}