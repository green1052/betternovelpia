import $ from "jquery";

export default {
    url: /\/$/,
    enable: ["NovelListFix"],
    start() {
        $(`div[class=""][onclick]`).attr("onclick", function (index, value) {
            $(this).attr("onclick", `$('.loads').show();${value}`);
        });
    }
} as Module;