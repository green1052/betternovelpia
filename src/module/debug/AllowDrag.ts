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
        novelLoaded(() => {
            document.ondragstart = null;
            document.onselectstart = null;

            document.addEventListener("contextmenu", (ev) => {
                ev.stopImmediatePropagation();
            }, true);

            setTimeout(() => {
                $(".no-drag").each((_, e) => e.classList.remove("no-drag"));
                $("#viewer_no_drag").each((_, e) => e.classList.remove("viewer_no_drag"));

                $(`[style*="user-select"]`).each((_, e) => $(e).css("user-select", "text"));

                for (const attr of ["ononcontextmenu", "oncontextmenu", "onselectstart", "ondragstart", "ondrop"]) {
                    $(`[${attr}]`).each((_, e) => {
                        e.removeAttribute(attr);
                    });
                }

                $(".line").each((_, e) => {
                    e.classList.remove("line");
                    e.setAttribute("style", "user-select: text !important;");
                });
            }, 1000);
        });
    }
} as Module;