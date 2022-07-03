export default {
    include: /^\/viewer\//,
    enable: ["HideViewerThumbnail"],
    config: {
        head: "뷰어 썸네일 숨기기",
        configs: {
            HideViewerThumbnail: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    property: "start",
    start() {
        GM_addStyle(".cover-wrapper { display: none !important; }");
    }
} as Module;