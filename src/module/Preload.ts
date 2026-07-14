import {novelLoaded} from "../util/NovelLoaded";
import {defineModule} from "../util/config";

export default defineModule({
    include: /^\/viewer\//,
    config: {
        head: "미리 불러오기 설정",
        configs: {
            PreLoadComment: {label: "댓글 미리 불러오기", type: "checkbox", default: false},
            PreLoadEpisodeList: {label: "목록 미리 불러오기", type: "checkbox", default: false}
        }
    },
    start({PreLoadComment, PreLoadEpisodeList}) {
        if (PreLoadComment) {
            novelLoaded(() => unsafeWindow.get_comment_box());
        }

        if (PreLoadEpisodeList) {
            novelLoaded(() => unsafeWindow.episode_list_viewer());
        }
    }
});
