import {novelLoaded} from "../util/NovelLoaded";

export default {
    include: /^\/viewer\//,
    config: {
        head: "미리 불러오기 설정",
        configs: {
            PreLoadComment: {
                label: "댓글 미리 불러오기",
                type: "checkbox",
                default: false
            },
            PreLoadEpisodeList: {
                label: "목록 미리 불러오기",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const PreLoadCommentEnable = GM_getValue<boolean>("PreLoadComment", false);
        const PreLoadEpisodeListEnable = GM_getValue<boolean>("PreLoadEpisodeList", false);

        if (PreLoadCommentEnable) {
            novelLoaded(() => unsafeWindow.episode_list_viewer());
        }

        if (PreLoadEpisodeListEnable) {
            novelLoaded(() => unsafeWindow.get_comment_box());
        }
    }
} as Module;