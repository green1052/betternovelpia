export default {Start};

import Config from "../Config";

function Start() {
    if (!Config.GetConfig("HideAddNovel"))
        return;

    if (!location.pathname.includes("/freestory") && !location.pathname.includes("/plus"))
        return;

    $(`div:contains("신규소설등록")`)[1]?.remove();
}