import $ from "jquery";

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

            $(`style:not([type]):not([nonce]):contains(".no-drag")`).html((index, html) =>
                html.replace(/.no-drag {.*}/, "")
            );

            $("#viewer_no_drag").css("user-select", "");

            return;
        }

        $(document.body).append(`<style>* {user-select: initial!important;}</style>`);
    }
} as Module;