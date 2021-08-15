import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("AbsoluteViewerDrag") || !location.pathname.includes("/viewer/"))
        return;

    clearInterval(playAlert);

    const body = $(document.body);

    for (const attr of ["ondragstart", "onselectstart", "oncontextmenu"])
        body.removeAttr(attr);

    body.prepend("<style>.no-drag{-ms-user-select:unset!important;-moz-user-select:unset!important;-webkit-user-select:unset!important;-khtml-user-select:unset!important;user-select:unset!important}</style>");
}