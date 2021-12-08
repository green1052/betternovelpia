import $ from "jquery";

export default {
    include: /^\/viewer\//,
    enable: ["AbsoluteViewerDrag"],
    config: {
        head: "뷰어 드래그 허용",
        configs: {
            AbsoluteViewerDrag: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        clearInterval(playAlert);
        playAlert = undefined;

        $(`style:not([type]):not([nonce]):contains(".no-drag")`).html((index, str) =>
            str.replace(/.no-drag {.*}/, "")
        );

        $("#viewer_no_drag").css("user-select", "");
    }
} as Module;