export default {start};

function start() {
    if (!GM_config.get("DisableViewLog") || !location.pathname.includes("/viewer/"))
        return;

    const upDownBtnView = unsafeWindow.up_down_btn_view.toString()
        .replace(`console.log("up_down_btn_view('" + option + "');");`, "")
        .replace(`console.log("currentPercentage('" + currentPercentage + "');");`, "")
        .replace(`console.log("#scroll_down_btn - show;");`, "")
        .replace(`console.log("#scroll_down_btn - hide;");`, "")
        .replace(`console.log("#scroll_down_btn - show2;");`, "")
        .replace(`console.log("#scroll_down_btn - hide2;");`, "");

    unsafeWindow.up_down_btn_view = (option: "on" | "off") =>
        eval(`${upDownBtnView}up_down_btn_view(option)`);

    const naviView = unsafeWindow.navi_view.toString()
        .replace("console.log('test_option_btn_comment:' + option_btn_comment);", "")
        .replace("console.log('test_toggle_navi:' + toggle_navi);", "")
        .replace(`console.log("navi_view - off");`, "");

    unsafeWindow.navi_view = () => eval(`${naviView}navi_view()`);
}