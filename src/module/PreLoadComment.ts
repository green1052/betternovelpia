import Cookies from "js-cookie";

export default {
    url: /^\/viewer\//,
    enable: ["PreLoadComment"],
    start() {
        $.ajax({
            url: `/json/viewer_comment/${$("#content_no").val()}/${localStorage["comment_sort"]}/${$("#comment_page").val()}`,
            success: (data) => {
                $("#comment_load").html(data);

                if (Cookies.get("DARKMODE") === "1") {
                    $("#comment_box").css("filter", "invert(1)");
                    $("#comment_box img").css("filter", "invert(1)");
                    $("#comment_box .nav-menu img").css("filter", "invert(0)");
                    $("#favorite_add").css("filter", "invert(1)");
                    $("#favorite_add img").css("filter", "invert(0)");
                    $("#comment_box .c_inv").css("filter", "");
                } else {
                    $("#comment_box").css("filter", "");
                    $("#comment_box img").css("filter", "");
                }
            }
        });
    }
} as Module;