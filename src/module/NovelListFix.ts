import $ from "jquery";

export default {
    url: /\/$/,
    enable: ["NovelListFix"],
    start() {
        $(`div[class=""][onclick*="/novel/"], div[onclick*="/novel/"]:not([class])`).attr("onclick", function (index, value) {
            $(this).attr("onclick", `$('.loads').show();${value}`);
        });
    }
} as Module;