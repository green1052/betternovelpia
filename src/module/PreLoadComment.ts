export default {
    url: /\/viewer\//,
    enable: ["PreLoadComment"],
    start() {
        comment_load();
    }
} as Module;