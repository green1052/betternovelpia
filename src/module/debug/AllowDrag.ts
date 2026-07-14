import {novelLoaded} from "../../util/NovelLoaded";
import {defineModule} from "../../util/config";

export default defineModule({
    include: /^\/viewer\//,
    enable: ["AllowDrag"],
    config: {
        head: "드래그 허용",
        configs: {
            AllowDrag: {label: "활성화", type: "checkbox", default: false}
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
                document.querySelectorAll(".no-drag").forEach(e => e.classList.remove("no-drag"));
                document.querySelectorAll("#viewer_no_drag").forEach(e => e.classList.remove("viewer_no_drag"));

                document.querySelectorAll(`[style*="user-select"]`).forEach(e => (e as HTMLElement).style.setProperty("user-select", "text"));

                for (const attr of ["ononcontextmenu", "oncontextmenu", "onselectstart", "ondragstart", "ondrop"]) {
                    document.querySelectorAll(`[${attr}]`).forEach(e => {
                        e.removeAttribute(attr);
                    });
                }

                document.querySelectorAll(".line").forEach(e => {
                    e.classList.remove("line");
                    e.setAttribute("style", "user-select: text !important;");
                });
            }, 1000);
        });
    }
});
