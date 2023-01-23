import $ from "jquery";
import {NOVEL_DRAWING} from "./Selectors";

export function fakeViewer(blocked: JQuery<HTMLElement>, novelData: { text: string, size: number, align: string }[]) {
    blocked
        .closest("#novel_text")
        .append(`<ol class="no-drag np"id=novel_drawing onclick=navi_view() style=padding:0;margin:0>`);

    blocked.remove();

    unsafeWindow.novel_data = novelData;

    setTimeout(() => {
        unsafeWindow.data_load = 1;
        unsafeWindow.novel_drawing(unsafeWindow.novel_data);

        const next = $(`img[src*="btn_next.png"]`)
            .parent()
            .attr("onclick");

        $(NOVEL_DRAWING)
            .children("br:last")
            .before(next
                ? `<div id=next_epi_btn_bottom onclick="${next}"style="background-color:rgba(155,155,155,.1);border:1px solid rgba(155,155,155,.2);border-radius:10px;padding:10px 20px;text-align:center;margin:30px 0 100px;cursor:pointer">다음화 보기</div>`
                : `<div style="background-color:rgba(155,155,155,.1);border:1px solid rgba(155,155,155,.2);border-radius:10px;padding:10px 20px;text-align:center;margin-top:30px">여기까지가 등록된 마지막 회차입니다</div>`
            );
    }, 10);
}