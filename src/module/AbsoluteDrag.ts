export default {
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
        if (/^\/viewer\//.test(location.pathname)) {
            clearInterval(playAlert);
            playAlert = undefined;
        }

        document.body.append("<style>*{user-select:initial!important;}</style>");
    }
} as Module;