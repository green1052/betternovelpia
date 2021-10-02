import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    url: /\/viewer\//,
    start() {
        if (GM_config.get("DBNextChapter"))
            $(NOVEL_BOX).on("dblclick", () => $(`img[src*="btn_next.png"]`).get(0).click());

        if (GM_config.get("TripleNextChapter"))
            document.querySelector(NOVEL_BOX)!.addEventListener("click", (event) => {
                if ((event as CustomEvent).detail === 3)
                    $(`img[src*="btn_next.png"]`).get(0).click();
            });
    }
} as Module;