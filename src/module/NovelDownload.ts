import $ from "jquery";
import {HEADER_BAR, NOVEL_DRAWING} from "../util/Selectors";

export default {
    url: /^\/viewer\//,
    enable: ["NovelDownload"],
    start() {
        const td = $("<td><h9>복사</h9></td>")
            .css("text-align", "center")
            .css("font-style", "12px")
            .css("width", "63px")
            .css("z-index", 10000)
            .on("click", () => {
                GM.setClipboard($(NOVEL_DRAWING).text()
                    .replace(/다음화 보기|여기까지가 등록된 마지막 회차입니다/, ""));

                alert("복사됐습니다.");
            });

        $(HEADER_BAR).children().eq(6).before(td);
    }
} as Module;