import $ from "jquery";

export default {
    include: /^\/viewer\//,
    enable: ["AutoRecommend"],
    config: {
        head: "자동으로 소설 추천",
        configs: {
            AutoRecommend: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        if ($("#btn_episode_vote").attr("src") === "/img/new/viewer/btn_vote.png")
            episode_vote();
    }
} as Module;