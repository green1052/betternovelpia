import {novelLoaded} from "../util/NovelLoaded";

export default {
    include: /^\/viewer\//,
    enable: ["PreLoadEpisodeList"],
    config: {
        head: "목록 미리 불러오기",
        configs: {
            PreLoadEpisodeList: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const code = unsafeWindow.episode_list_viewer.toString().split("\n");
        delete code[18];

        const episodeListViewer = code.join("");

        novelLoaded(() => eval(episodeListViewer));
    }
} as Module;