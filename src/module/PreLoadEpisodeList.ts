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
        setTimeout(() => episode_list_viewer(0), 500);
    }
} as Module;