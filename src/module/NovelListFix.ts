import $ from "jquery";

export default {
    include: /\/$/,
    enable: ["NovelListFix"],
    config: {
        head: "소설 목록 개선",
        configs: {
            NovelListFix: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $(`div[class=""][onclick*="/novel/"], div[onclick*="/novel/"]:not([class])`).attr("onclick", function (index, value) {
            $(this).attr("onclick", `$('.loads').show();${value}`);
        });
    }
} as Module;