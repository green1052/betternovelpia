import $ from "jquery";

export default {
    url: /^\/novel\//,
    enable: ["InfoUnfold"],
    config: {
        head: "상세정보 항상 보기",
        configs: {
            InfoUnfold: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $("#more_info_btn").hide();
        $(".more_info").show();
    }
} as Module;