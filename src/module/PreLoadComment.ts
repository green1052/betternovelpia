export default {
    url: /^\/viewer\//,
    enable: ["PreLoadComment"],
    start() {
        setTimeout(() => comment_load(), 500);
    }
} as Module;