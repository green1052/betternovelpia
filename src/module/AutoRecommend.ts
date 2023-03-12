import {novelLoaded} from "../util/NovelLoaded";

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
        novelLoaded(() => {
            unsafeWindow.episode_vote?.();
        });
    }
} as Module;
