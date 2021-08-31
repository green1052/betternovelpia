import $ from "jquery";
import {HEADER_BAR, NOVEL_DRAWING} from "../util/Selectors";

export default {start};

function start() {
    if (!GM_config.get("NovelDownload") || !location.pathname.includes("/viewer/"))
        return;

    const td = $("<td>")
        .css("text-align", "center")
        .css("font-style", "12px")
        .css("width", "63px")
        .css("z-index", 10000)
        .append("<h9>복사</h9>")
        .on("click", () => {
            const textarea = $("<textarea>")
                .val($(NOVEL_DRAWING).text()
                    .replace("다음화 보기", "")
                    .replace("여기까지가 등록된 마지막 회차입니다", ""))
                .attr("readonly", "")
                .css("position", "absolute")
                .css("left", "-9999px");

            $(document.body).prepend(textarea);

            textarea.select();

            document.execCommand("copy");

            textarea.remove();

            alert("복사됐습니다.");
        });

    $(HEADER_BAR).children().eq(6).before(td);
}