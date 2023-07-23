import {NOVEL_BOX} from "../util/Selectors";
import $ from "cash-dom";

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
        const clickNextChapter = GM_getValue<number>("ClickNextChapter", 0);

        if (clickNextChapter !== 0)
            $(NOVEL_BOX).on("click", (event: CustomEvent) => {
                if (event.detail === clickNextChapter)
                    $(".menu-next-item").get(0)?.click();
            });
    }
} as Module;
