export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("DBNextChapter") || !location.pathname.includes("/viewer/"))
        return;

    document.querySelector("#novel_drawing")?.addEventListener("dblclick", () => {
        const next = $("#next_epi_auto_url").val();

        if (!next)
            return;

        // @ts-ignore
        pageload(next, 1);
    });
}