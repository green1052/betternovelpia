import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    url: /^\/viewer\//,
    enable: ["AbsoluteViewerDrag"],
    start() {
        clearInterval(playAlert);
        playAlert = undefined;

        const $body = $(document.body);

        for (const event of ["ondragstart", "onselectstart", "oncontextmenu"]) {
            $body.removeAttr(event);
            $(NOVEL_BOX).removeAttr(event);
        }

        $body.append("<style>.no-drag{-ms-user-select:unset!important;-moz-user-select:unset!important;-webkit-user-select:unset!important;-khtml-user-select:unset!important;user-select:unset!important;}</style>");

        $("#viewer_no_drag").css("user-select");
    }
} as Module;