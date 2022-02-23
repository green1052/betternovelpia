import {FOOTER_BAR, HEADER_BAR} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    enable: ["NaviColor"],
    config: {
        head: "뷰어 배경색으로 네비 색 변경",
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
            const color = (document.querySelector("#viewer_no_drag") as HTMLElement).style.backgroundColor;

            (document.querySelector(HEADER_BAR) as HTMLElement).style.backgroundColor = color;
            (document.querySelector(FOOTER_BAR) as HTMLElement).style.backgroundColor = color;
        }

        const oldViewerDisplay = unsafeWindow.viewer_display;

        unsafeWindow.viewer_display = () => {
            oldViewerDisplay();
            changeTheme();
        };

        changeTheme();
    }
} as Module;