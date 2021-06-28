export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("DBNextChapter") || !location.pathname.includes("/viewer/"))
        return;

    $("#novel_drawing").on("dblclick", () => {
        const next = $("#next_epi_auto_url").val();

        if (!next)
            return;

        // @ts-ignore
        pageload(next, 1);
    });
}