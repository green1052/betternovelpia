import $ from "jquery";
import {NOVEL_DRAWING} from "./Selectors";
import NovelDrawing from "../html/novelDrawing.html";
import NextChapter from "../html/nextChapter.html";
import LastChapter from "../html/lastChapter.html";

export function fakeViewer(blocked: JQuery<HTMLElement>, novelData: { text: string, size: number, align: string }[]) {
    blocked
        .parent()
        .parent()
        .parent()
        .append(NovelDrawing);

    blocked.parent().parent().remove();

    novel_data = novelData;

    setTimeout(() => {
        data_load = 1;
        novel_drawing(novel_data);

        const next = $(`img[src*="btn_next.png"]`)
            .parent()
            .attr("onclick");

        $(NOVEL_DRAWING)
            .append(next
                ? $(NextChapter).attr("onclick", next)
                : LastChapter
            );
    }, 10);
}