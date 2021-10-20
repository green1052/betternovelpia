import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    url: /^\/viewer\//,
    start() {
        function next() {
            $(`img[src*="btn_next.png"]`).get(0)?.click();
        }

        if (GM_config.get("DBNextChapter"))
            $(NOVEL_BOX).on("dblclick", next);

        if (GM_config.get("TripleNextChapter"))
            document.querySelector(NOVEL_BOX)!.addEventListener("click", (event) => {
                if ((<CustomEvent>event).detail === 3)
                    next();
            });
    }
} as Module;