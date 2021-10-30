import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    url: /^\/viewer\//,
    start() {
        const clickNextChapter = GM_config.get("ClickNextChapter");

        if (clickNextChapter !== 0)
            document.querySelector(NOVEL_BOX)!.addEventListener("click", (event) => {
                if ((<CustomEvent>event).detail === clickNextChapter)
                    $(`img[src*="btn_next.png"]`).get(0)?.click();
            });
    }
} as Module;