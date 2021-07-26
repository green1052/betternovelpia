export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("NovelListFix") || location.pathname !== "/")
        return;

    $(`div[class*="mobile_show"]`).last().children().each((index, element) => {
        const query = $(element);
        const onclick = query.attr("onclick");

        if (!onclick)
            return;

        query.attr("onclick", `$(".loads").show(); ${onclick}`);
    });
}