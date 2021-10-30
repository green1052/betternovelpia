import {NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE} from "../../util/Selectors";
import {waitElement} from "../../util/WaitElement";
import {isFirst} from "./Bookmark";
import $ from "jquery";

export interface PreviousBookmark {
    title: string;
    chapter: string;
    url: string;
    scrollTop: number;
}

export default {
    enable: ["PreviousBookmark"],
    start() {
        novelBookmark();
        viewerBookmark();
    }
} as Module;

function novelBookmark() {
    if (!/^\/novel\//.test(location.pathname))
        return;

    const previousBookmark: PreviousBookmark = GM_getValue("previousBookmark", {});

    if (previousBookmark.title === document.title.split("-")[2].trimLeft())
        $(`div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("이어보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("첫화보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("신규회차등록")`)
            .parent()
            .append(`<div style="background-color:#6143d1;color:#fff;width:100%;line-height:40px;margin-top:10px;text-align:center;cursor:pointer;" onclick="$('.loads').show();location='${previousBookmark.url}';"> <span style="background-color: #7f66de;border: 1px solid #fff;padding: 1px 6px;border-radius: 10px;font-size: 11px; margin-right: 3px;">${previousBookmark.chapter}</span> 이전 소설 이어보기 </div>`);
}

function viewerBookmark() {
    if (!/^\/viewer\//.test(location.pathname))
        return;

    let lastScrollTop = 0;

    setInterval(() => {
        const scrollTop = $(NOVEL_BOX).scrollTop();

        if (!scrollTop || scrollTop === lastScrollTop)
            return;

        GM_setValue("previousBookmark", {
            title: $(NOVEL_TITLE).text(),
            chapter: $(NOVEL_EP).text(),
            url: location.href,
            scrollTop: scrollTop
        } as PreviousBookmark);

        lastScrollTop = scrollTop;
    }, 1000);

    const bookmark: PreviousBookmark = GM_getValue("previousBookmark");

    if (!bookmark || location.href !== bookmark.url || !isFirst("previous"))
        return;

    if (GM_config.get("PreviousBookmark_OneUse"))
        GM_setValue("previousBookmark", {});

    const goto = () => {
        if (!GM_config.get("PreviousBookmark_AutoUse") && !confirm("읽던 부분으로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: bookmark.scrollTop}, 0);
    };

    if ($(NOVEL_DRAWING).children().length > 0) {
        goto();
        return;
    }

    waitElement($(NOVEL_DRAWING).get(0), goto);
}