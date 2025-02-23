import $ from "cash-dom";
import {novelLoaded} from "../../util/NovelLoaded";

export default {
    include: /^\/viewer\//,
    enable: ["AllowDrag"],
    config: {
        head: "드래그 허용",
        configs: {
            AllowDrag: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $(".no-drag").each((_, e) => e.classList.remove("no-drag"));

        for (const attr of ["oncontextmenu", "onselectstart", "ondragstart", "ondrop"]) {
            $(`[${attr}]`).each((_, e) => {
                e.removeAttribute(attr);
            });
        }

        novelLoaded(() => {
            $(".line").each((_, e) => {
                e.setAttribute("style", "user-select: text !important;");
            });
        });
    }
} as Module;