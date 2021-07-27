export default {Start};

function Start() {
    if (!GM_config.get("HideAddNovel") || !location.pathname.includes("/freestory") && !location.pathname.includes("/plus"))
        return;

    $(`div:contains("신규소설등록")`).eq(1).remove();
}