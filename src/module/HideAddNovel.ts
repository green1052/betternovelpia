import $ from "jquery";

export default {
    url: /^\/freestory|plus/,
    enable: ["HideAddNovel"],
    start() {
        $(`div[onclick*="/publishing/new"]`).remove();
    }
} as Module;