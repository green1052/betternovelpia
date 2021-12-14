import {isFirst, PreviousBookmark} from "../../util/Bookmark";
import $ from "jquery";
import {NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE} from "../../util/Selectors";
import toastr from "toastr";
import {element} from "../../util/Element";
import {isPageViewer} from "../../util/IsPageViewer";

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

    const bookmark = GM_getValue("previousBookmark", {}) as PreviousBookmark;

    let scrollTop = 0;

    $(NOVEL_BOX).on("scroll", (e) => scrollTop = e.currentTarget.scrollTop);

    $(window).on("beforeunload", () => {
        GM_setValue("previousBookmark", {
            url: location.href,
            scrollTop: scrollTop,
            title: title,
            chapter: chapter
        } as PreviousBookmark);
    });

    if (!bookmark || !bookmark.scrollTop || location.href !== bookmark.url || !isFirst("previous"))
        return;

    if (GM_getValue("PreviousBookmark_OneUse", false))
        GM_setValue("previousBookmark", {});

    element($(NOVEL_DRAWING), () => {
        if (!GM_getValue("PreviousBookmark_AutoUse", false) && !confirm("읽던 부분으로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: bookmark.scrollTop}, 0);
    });
}

export default {
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
        if (isPageViewer()) {
            toastr.info("페이지 방식은 지원하지 않습니다.", "이전 회차 북마크");
            return;
        }

        novel();
        viewer();
    }
} as Module;
