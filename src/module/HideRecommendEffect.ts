import $ from "jquery";

export default {
    include: /^\/viewer\//,
    enable: ["HideRecommendEffect"],
    config: {
        head: "추천 효과 숨기기",
        configs: {
            HideRecommendEffect: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $(".like_btn").remove();
    }
} as Module;