import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    url: /^\/viewer\//,
    config: {
        head: "클릭으로 다음 회차",
        configs: {
            ClickNextChapter: {
                label: "(0~5)",
                type: "text",
                title: "(0~5)"
            }
        }
    },
    start() {
        const clickNextChapter = GM_getValue("ClickNextChapter", 0);

        if (clickNextChapter !== 0)
            document.querySelector(NOVEL_BOX)!.addEventListener("click", (event) => {
                if ((<CustomEvent>event).detail === clickNextChapter)
                    $(`img[src*="btn_next.png"]`).get(0)?.click();
            });
    }
} as Module;