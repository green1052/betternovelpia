import $ from "jquery";
import {NOVEL_DRAWING} from "./Selectors";

export function fakeViewer(blocked: JQuery<HTMLElement>, novelData: { text: string, size: number, align: string }[]) {
    blocked
        .parent()
        .parent()
        .parent()
        .append(`<ol onclick="navi_view();" style="padding:0px;margin:0px;" id="novel_drawing" class="no-drag np">`);

    blocked.parent().parent().remove();

    novel_data = novelData;

    setTimeout(() => {
        data_load = 1;
        novel_drawing(novel_data);

        const next = $(`img[src*="btn_next.png"]`)
            .parent()
            .attr("onclick");

        $(NOVEL_DRAWING)
            .children("br:last")
            .before(next
                ? `<div id="next_epi_btn_bottom" style="background-color: rgba(155, 155, 155, 0.1); border: 1px solid rgba(155, 155, 155, 0.2); border-radius: 10px; padding: 10px 20px; text-align: center; margin: 30px 0px 100px; cursor: pointer;" onclick="${next}">다음화 보기</div>`
                : `<div style="background-color: rgba(155,155,155,0.1); border: 1px solid  rgba(155,155,155,0.2); border-radius: 10px; padding: 10px 20px;margin-top:10px;text-align:center;margin-top:30px;">여기까지가 등록된 마지막 회차입니다</div>`
            );
    }, 10);
}