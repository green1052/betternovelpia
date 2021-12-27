import $ from "jquery";

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
    start() {
        $(`div[class="cover-wrapper"]`).parent().remove();
    }
} as Module;