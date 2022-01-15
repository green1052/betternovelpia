import {element} from "../util/Element";
import {NOVEL_DRAWING} from "../util/Selectors";
import $ from "jquery";

export default {
    include: /^\/viewer\//,
    enable: ["PreLoadComment"],
    config: {
        head: "댓글 미리 불러오기",
        configs: {
            PreLoadComment: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        element($(NOVEL_DRAWING), () => {
            setTimeout(unsafeWindow.get_comment_box, 500);
        });
    }
} as Module;