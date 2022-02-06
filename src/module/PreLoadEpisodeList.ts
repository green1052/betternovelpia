import {novelLoad} from "../util/NovelLoad";

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
        novelLoad(() =>
            episode_list_viewer(Number(localStorage.getItem(`novel_page_${(document.querySelector("#novel_no") as HTMLInputElement).value}`)))
        );
    }
} as Module;