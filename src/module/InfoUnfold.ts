import $ from "jquery";

export default {
    enable: ["InfoUnfold"],
    start() {
        $("#more_info_btn").hide();
        $(".more_info").show();
    }
} as Module;