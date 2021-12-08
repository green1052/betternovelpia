import $ from "jquery";
import {NOVEL_BOX} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    config: {
        head: "클릭으로 다음 회차",
        configs: {
            ClickNextChapter: {
                label: "(0~5)",
                type: "int",
                min: 0,
                max: 5,
                default: 0
            }
        }
    },
    start() {
        const clickNextChapter = GM_getValue("ClickNextChapter", 0) as number;

        if (clickNextChapter !== 0)
            document.querySelector(NOVEL_BOX)!.addEventListener("click", (event) => {
                if ((<CustomEvent>event).detail === clickNextChapter)
                    $(`img[src*="btn_next.png"]`).get(0)?.click();
            });
    }
} as Module;