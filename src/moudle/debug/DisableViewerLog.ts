import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("DisableViewLog") || !location.pathname.includes("/viewer/"))
        return;

    unsafeWindow.up_down_btn_view = (option: "on" | "off") => {
        if (option === "off") {
            $("#scroll_up_btn").hide();
            $("#scroll_down_btn").hide();

            return;
        }

        const commentBox = $("#comment_box");
        const novelBox = $("#novel_box");

        const currentPercentage = option_btn_comment == 1
            ? (commentBox.scrollTop()! / ($("#comment_load").outerHeight()! - commentBox.height()!)) * 100
            : (novelBox.scrollTop()! / ($("#novel_text").outerHeight()! - novelBox.height()!)) * 100;

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

    unsafeWindow.navi_view = () => {
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