import {isFirst, PreviousBookmark} from "./util";
import $ from "jquery";
import {NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE} from "../../util/Selectors";
import {waitElement} from "../../util/WaitElement";

function novel() {
    if (!/^\/novel\//.test(location.pathname)) return;

    const previousBookmark = GM_getValue("previousBookmark", {}) as PreviousBookmark;

    if (previousBookmark.title === document.title.split("-")[2].trimLeft())
        $(`div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("이어보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("첫화보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("신규회차등록")`)
            .parent()
            .append(`<div style="background-color:#6143d1;color:#fff;width:100%;line-height:40px;margin-top:10px;text-align:center;cursor:pointer;" onclick="$('.loads').show();location='${previousBookmark.url}';"> <span style="background-color: #7f66de;border: 1px solid #fff;padding: 1px 6px;border-radius: 10px;font-size: 11px; margin-right: 3px;">${previousBookmark.chapter}</span> 이전 소설 이어보기 </div>`);
}

function viewer() {
    if (!/^\/viewer\//.test(location.pathname)) return;

    const title = encodeURIComponent($(NOVEL_TITLE).text());
    const chapter = $(NOVEL_EP).text();

    if (!chapter)
        return;

    let lastScrollTop = 0;
    setInterval(() => {
        const scrollTop = $(NOVEL_BOX).scrollTop();

        if (!scrollTop || scrollTop === lastScrollTop)
            return;

        GM_setValue("previousBookmark", {
            url: location.href,
            scrollTop: scrollTop,
            title: title,
            chapter: chapter
        } as PreviousBookmark);

        lastScrollTop = scrollTop;
    }, 1000);

    const bookmark = GM_getValue("previousBookmark", {}) as PreviousBookmark;

    if (!bookmark || location.href !== bookmark.url || !isFirst("previous"))
        return;

    if (GM_getValue("PreviousBookmark_OneUse", false))
        GM_setValue("previousBookmark", {});

    const goto = () => {
        if (!GM_getValue("PreviousBookmark_AutoUse", false) && !confirm("읽던 부분으로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: bookmark.scrollTop}, 0);
    };

    if ($(NOVEL_DRAWING).children().length > 0) {
        goto();
        return;
    }

    waitElement($(NOVEL_DRAWING).get(0)!, goto);
}

export default {
    url: /^\/novel\//,
    enable: ["PreviousBookmark"],
    config: {
        head: "이전 회차 북마크 설정",
        configs: {
            PreviousBookmark: {
                label: "활성화",
                type: "checkbox",
                default: false
            },
            PreviousBookmark_First: {
                label: "이전 회차 북마크 우선",
                type: "checkbox",
                default: false
            },
            PreviousBookmark_OneUse: {
                label: "이전 회차 북마크 한번만 사용",
                type: "checkbox",
                default: false
            },
            PreviousBookmark_AutoUse: {
                label: "이전 회차 북마크 자동 이동",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        novel();
        viewer();
    }
} as Module;