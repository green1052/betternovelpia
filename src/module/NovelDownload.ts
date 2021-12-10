import $ from "jquery";
import {NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE} from "../util/Selectors";
import {appendHeader} from "../util/AppendHeader";
import {saveAs} from "file-saver";

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
            },
            NovelDownload_Copy: {
                label: "소설 내용 복사 (비활성화 시 파일로 저장됨)",
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
                const novelText = $(NOVEL_DRAWING).text().replace(/다음화 보기|여기까지가 등록된 마지막 회차입니다/, "");

                if (GM_getValue("NovelDownload_Copy", false))
                    GM_setClipboard(novelText);
                else {
                    const blob = new Blob([novelText], {type: "text/plain;charset=utf-8"});
                    saveAs(blob, `${$(NOVEL_EP).text() ?? "EP.오류"} - ${$(NOVEL_TITLE).text()}.txt`);
                }

                toastr.info("복사됐습니다.", "소설 다운로드");
            });

        appendHeader(td);
    }
} as Module;