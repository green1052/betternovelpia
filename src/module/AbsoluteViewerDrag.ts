import $ from "jquery";

export default {
    url: /^\/viewer\//,
    enable: ["AbsoluteViewerDrag"],
    start() {
        clearInterval(playAlert);
        playAlert = undefined;

        $(document.body)
            .removeAttr("ondragstart")
            .removeAttr("onselectstart")
            .removeAttr("oncontextmenu")
            .append("<style>.no-drag{-ms-user-select:unset!important;-moz-user-select:unset!important;-webkit-user-select:unset!important;-khtml-user-select:unset!important;user-select:unset!important;}</style>");
    }
} as Module;