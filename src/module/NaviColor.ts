import $ from "jquery";
import {FOOTER_BAR, HEADER_BAR} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    enable: ["NaviColor"],
    config: {
        head: "뷰어 배경색으로 테마 변경",
        configs: {
            NaviColor: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        function changeTheme() {
            const color = $("#viewer_no_drag").css("background-color");

            $(HEADER_BAR).css("background-color", color);
            $(FOOTER_BAR).css("background-color", color);
        }

        const oldViewerDisplay = unsafeWindow.viewer_display;

        unsafeWindow.viewer_display = () => {
            oldViewerDisplay();
            changeTheme();
        };

        changeTheme();
    }
} as Module;