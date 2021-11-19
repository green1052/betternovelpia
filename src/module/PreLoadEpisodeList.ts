export default {
    url: /^\/viewer\//,
    enable: ["PreLoadEpisodeList"],
    start() {
        setTimeout(() => episode_list_viewer(0), 500);
    }
} as Module;