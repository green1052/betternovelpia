import $ from "jquery";

export default {start};

function start() {
    if (GM_config.get("DBNextChapter") && location.pathname.includes("/viewer/"))
        $("#novel_box").on("dblclick", () => $(`img[src*="btn_next.png"]`).get(0).click());
}