import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("HideAddNovel") || !location.pathname.includes("/freestory") && !location.pathname.includes("/plus"))
        return;

    $(`div:contains("신규소설등록")`).eq(1).remove();
}