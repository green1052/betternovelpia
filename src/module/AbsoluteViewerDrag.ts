import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("AbsoluteViewerDrag") || !location.pathname.includes("/viewer/"))
        return;

    clearInterval(playAlert);
    playAlert = undefined;

    $(document.body)
        .removeAttr("ondragstart")
        .removeAttr("onselectstart")
        .removeAttr("oncontextmenu")
        .append("<style>.no-drag{-ms-user-select:unset!important;-moz-user-select:unset!important;-webkit-user-select:unset!important;-khtml-user-select:unset!important;user-select:unset!important;}</style>");
}