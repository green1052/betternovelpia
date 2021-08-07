import $ from "jquery";

export default {start};

function start() {
    if (GM_config.get("NovelListFix") && location.pathname === "/")
        $(`div[class=""][onclick*="location"]`).each((index, element) => {
            const query = $(element);
            query.attr("onclick", `$('.loads').show();${query.attr("onclick")}`);
        });
}