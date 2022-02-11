import {novelLoad} from "../util/NovelLoad";

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
        novelLoad(() => unsafeWindow.get_comment_box());
    }
} as Module;