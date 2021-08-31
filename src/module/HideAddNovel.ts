import $ from "jquery";

export default {start};

function start() {
    if (GM_config.get("HideAddNovel") && location.pathname.includes("/freestory") || location.pathname.includes("/plus"))
        $(`div[onclick*="/publishing/new"]`).remove();
}