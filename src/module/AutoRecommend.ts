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
        const vote = $("#btn_episode_vote");

        if (vote.attr("src") === "/img/new/viewer/btn_vote.png")
            vote.get(0)!.click();
    }
} as Module;