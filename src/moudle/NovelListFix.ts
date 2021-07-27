export default {Start};

function Start() {
    if (!GM_config.get("NovelListFix") || location.pathname !== "/")
        return;

    $(`div[class=""][onclick*="location"]`).each((index, element) => {
        const query = $(element);
        query.attr("onclick", `$(".loads").show(); ${query.attr("onclick")}`);
    });
}