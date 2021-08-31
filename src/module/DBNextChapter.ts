import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {start};

function start() {
    if (GM_config.get("DBNextChapter") && location.pathname.includes("/viewer/"))
        $(NOVEL_BOX).on("dblclick", () => $(`img[src*="btn_next.png"]`).get(0).click());
}