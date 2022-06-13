import {NOVEL_BOX, NOVEL_DRAWING} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    enable: ["AbsoluteDrag"],
    config: {
        head: "드래그 허용",
        configs: {
            AbsoluteDrag: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        clearInterval(playAlert);
        playAlert = undefined;

        $(document).unbind("keydown");
        $(document.body).unbind(`contextmenu`);

        document.ondragstart = null;
        document.onselectstart = null;

        for (const event of ["oncontextmenu", "onselectstart", "ondragstart", "ondrop"]) {
            document.body.removeAttribute(event);
            document.querySelector("#viewer_no_drag")?.removeAttribute(event);
            document.querySelector(NOVEL_BOX)?.removeAttribute(event);
            document.querySelector("#novel_text")?.removeAttribute(event);
            document.querySelector(NOVEL_DRAWING)?.removeAttribute(event);
            document.querySelector("#novel_drawing_page_c")?.removeAttribute(event);
            document.querySelector("#novel_drawing_page")?.removeAttribute(event);
        }

        document.body.innerHTML += `<style>*{user-select:initial!important;}</style>`;
    }
} as Module;