import $ from "jquery";

export default {
    include: /^\/novel\//,
    enable: ["HideReview"],
    config: {
        head: "작품 리뷰 숨기기",
        configs: {
            HideReview: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $(".novel_review_mob").remove();
    }
} as Module;