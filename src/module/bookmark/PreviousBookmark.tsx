import {isFirst, PreviousBookmark} from "../../util/Bookmark";
import $ from "jquery";
import {NOVEL_BOX, NOVEL_EP, NOVEL_TITLE} from "../../util/Selectors";
import toastr from "toastr";
import {isPageViewer} from "../../util/IsPageViewer";
import ReactDOM from "react-dom";
import {NovelContinueBox} from "../../util/NovelContinueBox";
import React from "react";
import {novelLoaded} from "../../util/NovelLoaded";

function Novel() {
    const previousBookmark = GM_getValue<PreviousBookmark | undefined>("previousBookmark", undefined);

    return (
        previousBookmark !== undefined && !isNaN(previousBookmark.scrollTop) && previousBookmark.title === document.title.split("-")[2].trimStart()
            ? <NovelContinueBox url={previousBookmark.url} chapter={previousBookmark.chapter}/>
            : null
    );
}

function viewer() {
    if (!/^\/viewer\//.test(location.pathname)) return;

    const title = document.querySelector(NOVEL_TITLE)?.innerHTML ?? "알 수 없음";
    const chapter = document.querySelector(NOVEL_EP)?.textContent ?? "알 수 없음";

    const bookmark = GM_getValue<PreviousBookmark | undefined>("previousBookmark", undefined);
    const url = location.href;

    let scrollTop = -1;

    $(NOVEL_BOX).on("scroll", (e) => scrollTop = e.currentTarget.scrollTop);

    window.addEventListener("beforeunload", () => {
        if (scrollTop > -1) GM_setValue("previousBookmark", {url, scrollTop, title, chapter} as PreviousBookmark);
    });

    if (bookmark === undefined || location.href !== bookmark.url || !bookmark.scrollTop || !isFirst("previous"))
        return;

    novelLoaded(() => {
        setTimeout(() => {
            if (GM_getValue<boolean>("PreviousBookmark_OneUse", false))
                GM_setValue("previousBookmark", {});

            if (!GM_getValue<boolean>("PreviousBookmark_AutoUse", false) && !confirm("읽던 부분으로 이동하시겠습니까?")) return;

            document.querySelector(NOVEL_BOX)?.scroll(0, bookmark.scrollTop);
        }, 1000);
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

        if (/^\/novel\//.test(location.pathname)) {
            const tr = $("tbody:has(> .more_info) tr:last > td");

            const appContainer = document.createElement("div");
            tr.append(appContainer);
            ReactDOM.render(<Novel/>, appContainer);
        }

        viewer();
    }
} as Module;