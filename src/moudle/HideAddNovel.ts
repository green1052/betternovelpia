export default {Start};

import Config from "../Config";

function Start() {
    if (Config.GetConfig("HideAddNovel") && !location.pathname.includes("/viewer/"))
        $(`div:contains("신규소설등록")`)[1]?.remove();
}