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
        (document.querySelector(`#btn_episode_vote[src="/img/new/viewer/btn_vote.png"]`) as HTMLElement).click();
    }
} as Module;