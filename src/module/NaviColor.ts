import $ from "jquery";
import {isDarkMode} from "../util/IsDarkMode";
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
        function getTheme() {
            if (isDarkMode())
                switch (localStorage.getItem("viewer_bg")) {
                    case "1":
                    case "":
                    case undefined:
                        return "#000";

                    case "2":
                        return "#4e4e4e";

                    case "3":
                        return "#565314";

                    case "4":
                        return "#225816";

                    default:
                        return localStorage["viewer_bg"];
                }
            else
                switch (localStorage.getItem("viewer_bg")) {
                    case "1":
                    case "":
                    case undefined:
                        return "#000";

                    case "2":
                        return "#545454";

                    case "3":
                        return "#797417";

                    case "4":
                        return "#246b15";

                    default:
                        return localStorage["viewer_bg"];
                }
        }

        function changeTheme() {
            const theme = getTheme();

            $(HEADER_BAR).css("background-color", theme);
            $(FOOTER_BAR).css("background-color", theme);
        }

        const oldViewerDisplay = unsafeWindow.viewer_display;

        unsafeWindow.viewer_display = () => {
            oldViewerDisplay();
            changeTheme();
        };

        changeTheme();
    }
} as Module;