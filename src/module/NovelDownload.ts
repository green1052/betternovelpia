import $ from "jquery";
import {NOVEL_DRAWING} from "../util/Selectors";
import toastr from "toastr";
import {appendHeader} from "../util/AppendHeader";

export default {
    include: /^\/viewer\//,
    enable: ["NovelDownload"],
    config: {
        head: "소설 복사 사용",
        configs: {
            NovelDownload: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const td = $(`<td><i class="icon ion-code-download"></td>`)
            .css("text-align", "center")
            .css("font-size", "25px")
            .css("font-style", "12px")
            .css("width", 63)
            .css("z-index", 10000)
            .on("click", () => {
                GM_setClipboard($(NOVEL_DRAWING).text().replace(/다음화 보기|여기까지가 등록된 마지막 회차입니다/, ""));

                toastr.info("복사됐습니다.", "소설 다운로드");
            });

        appendHeader(td);
    }
} as Module;