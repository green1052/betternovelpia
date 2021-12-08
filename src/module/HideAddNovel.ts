import $ from "jquery";

export default {
    include: /^\/freestory|plus/,
    enable: ["HideAddNovel"],
    config: {
        head: "소설 등록 숨기기",
        configs: {
            HideAddNovel: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $(`div[onclick*="/publishing/new"]`).remove();
    }
} as Module;