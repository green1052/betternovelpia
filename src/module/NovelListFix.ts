import $ from "jquery";

export default {start};

function start() {
    if (GM_config.get("NovelListFix") && location.pathname === "/")
        $(`div[class=""][onclick]`).attr("onclick", function (index, value) {
            $(this).attr("onclick", `$('.loads').show();${value}`);
        });
}