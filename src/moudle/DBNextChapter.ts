export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("DBNextChapter") || !location.pathname.includes("/viewer/"))
        return;

    $("#novel_box").on("dblclick", () => {
        const next = $("#next_epi_auto_url").val() as string;

        if (next)
            pageload(next, 1);
        else
            eval($(`img[src*="btn_next.png"]`).parent().attr("onclick") ?? "");
    });
}