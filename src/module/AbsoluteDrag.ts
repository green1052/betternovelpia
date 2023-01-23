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
        clearInterval(unsafeWindow.playAlert);
        unsafeWindow.playAlert = undefined;

        for (const attr of ["ondragstart", "onselectstart", "oncontextmenu", "ondrop"]) {
            // @ts-ignore
            document[attr] &&= null;
            document.body.removeAttribute(attr);

            for (const element of document.querySelectorAll(`*[${attr}]`))
                element.removeAttribute(attr);
        }

        for (const element of document.querySelectorAll("font[class=line]"))
            element.removeAttribute("class");

        unsafeWindow.$(document).unbind("keydown");
        unsafeWindow.$(document.body).unbind("contextmenu");

        GM_addStyle("* { user-select: initial!important; }");
    }
} as Module;