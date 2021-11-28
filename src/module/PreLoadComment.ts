export default {
    url: /^\/viewer\//,
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
        setTimeout(() => comment_load(), 500);
    }
} as Module;