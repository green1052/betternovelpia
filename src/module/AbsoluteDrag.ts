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

        document.body.innerHTML += "<sytle>.no-drag{-ms-user-select:initial!important;-moz-user-select:initial!important;-webkit-user-select:initial!important;-khtml-user-select:initial!important;user-select:initial!important}</sytle>";
    }
} as Module;