import Config from "../Config";

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
                up_down_btn_view("off");
                // @ts-ignore
                option_btn_theme = 0;
                $("#btn_theme").attr("src", "/img/new/viewer/btn_theme.png");
                // @ts-ignore
                toggle_navi = 1;
            }
        }
    };

    $("#novel_box").off("scroll");

    document.querySelector("#novel_box")?.addEventListener("scroll", () => {
        $("#scroll-btn").hide();
        // @ts-ignore
        var currentPercentage = ($("#novel_box").scrollTop() / ($("#novel_text").outerHeight() - $("#novel_box").height())) * 100;
        $("#i-am-progress-indicator").width(currentPercentage + "%");

        up_down_btn_view("on");

        if (localStorage["viewer_paging"] == 1) {
            // @ts-ignore
            $("#page_navigation").val(this_page).change();
        } else {
            // @ts-ignore
            this_page = Math.round($("#novel_box").scrollTop() / $("#novel_box").innerHeight()) + 1;
            // @ts-ignore
            $("#this_page_view").html(this_page);

            // @ts-ignore
            if (($("#novel_box").scrollTop() + $("#novel_box").innerHeight()) >= $("#novel_text").outerHeight() - 100) {
            } else if ($("#novel_box").scrollTop() != 0) {
                // @ts-ignore
                if (toggle_navi_animate_lock == 0) {
                    // @ts-ignore
                    $("#page_navigation").val(this_page).change();
                }
            }
        }

        // @ts-ignore
        if (currentPercentage >= 99.9 && $("#novel_box").scrollTop() > 1000) {
            if (localStorage["viewer_nextepi"] == "on" && $("#next_epi_auto_url").val() != "") {
                // @ts-ignore
                if ($("#content_no_next").val() > 0) {
                    localStorage["bookmark_" + $("#content_no_next").val()] = 1;
                }
                // @ts-ignore
                pageload($("#next_epi_auto_url").val(), 1);
            } else if (localStorage["viewer_nextepi"] == "on") {
                alert("다음 등록 된 회차가 없습니다.");
            }
        } else if (currentPercentage < 10) {
            $("#scroll_up_btn").hide();
        }

        // @ts-ignore
        if (toggle_navi == 0 && ($("#btn_theme").attr("src") == "/img/new/viewer/btn_theme.png") && $("#btn_comment").attr("src") != "/img/new/viewer/btn_comment_on.png" && toggle_navi_lock == 0) {
            $("#footer_bar").hide();
            $("#header_bar").hide();
            $("#theme_box").hide();

            up_down_btn_view("off");
            // @ts-ignore
            toggle_navi = 1;
        }
    });
}