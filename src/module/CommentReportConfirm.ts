export default {
    include: /^\/viewer\//,
    enable: ["CommentReportConfirm"],
    config: {
        head: "댓글 신고 두번 확인",
        configs: {
            CommentReportConfirm: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const oldOptionProc = unsafeWindow.option_proc;

        unsafeWindow.option_proc = (option: string, value: string) => {
            if (confirm("신고하시겠습니까?"))
                oldOptionProc(option, value);
        };
    }
} as Module;