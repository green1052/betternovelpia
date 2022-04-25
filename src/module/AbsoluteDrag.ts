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
        document.body.innerHTML += "<style>.no-drag{user-select:initial!important;}</style>";
    }
} as Module;