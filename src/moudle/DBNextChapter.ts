export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("DBNextChapter") || !location.pathname.includes("/viewer/"))
        return;

    $("#novel_drawing").on("dblclick", () => {
        const next = $("#next_epi_auto_url").val();

        if (!next)
            return;

        pageload(next, 1);
    });
}