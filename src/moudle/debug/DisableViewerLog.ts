export default {start};

function start() {
    if (!GM_config.get("DisableViewLog") || !location.pathname.includes("/viewer/"))
        return;

    unsafeWindow.up_down_btn_view = new Function(unsafeWindow.up_down_btn_view.toString()
        .replace(`console.log("up_down_btn_view('" + option + "');");`, "")
        .replace(`console.log("currentPercentage('" + currentPercentage + "');");`, "")
        .replace(`console.log("#scroll_down_btn - show;");`, "")
        .replace(`console.log("#scroll_down_btn - hide;");`, "")
        .replace(`console.log("#scroll_down_btn - show2;");`, "")
        .replace(`console.log("#scroll_down_btn - hide2;");`, ""));

    unsafeWindow.navi_view = new Function(unsafeWindow.navi_view.toString()
        .replace("console.log('test_option_btn_comment:' + option_btn_comment);", "")
        .replace("console.log('test_toggle_navi:' + toggle_navi);", "")
        .replace(`console.log("navi_view - off");`, ""));
}