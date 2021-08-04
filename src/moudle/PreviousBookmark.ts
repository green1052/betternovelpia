import $ from "jquery";
import {Bookmarks} from "./Bookmark";

export default {start};

export interface PreviousBookmark {
    url: string,
    scrollTop: number
}

async function start() {
    if (!GM_config.get("PreviousBookmark") || !location.pathname.includes("/viewer/"))
        return;

    let lastScrollTop: number;

    setInterval(() => {
        const scrollTop = $("#novel_box").scrollTop() ?? 0;

        if (!scrollTop || scrollTop === lastScrollTop)
            return;

        lastScrollTop = scrollTop;

        GM.setValue("tempBookmark", {url: location.href, scrollTop: scrollTop});
    }, 1000);

    const bookmark: PreviousBookmark = await GM.getValue("tempBookmark");

    if (!bookmark || location.href !== bookmark.url)
        return;

    const bookmarks: Bookmarks = await GM.getValue("bookmarks");

    if (!GM_config.get("PreviousBookmark_First") && (bookmarks && bookmarks.hasOwnProperty(location.href)))
        return;

    if (GM_config.get("PreviousBookmark_OnlyUse"))
        GM.setValue("tempBookmark", {});

    if (!bookmark.scrollTop)
        return;

    const observer = new MutationObserver(() => {
        observer.disconnect();

        if (!GM_config.get("PreviousBookmark_AutoUse"))
            if (!confirm("읽던 부분으로 이동하시겠습니까?"))
                return;

        $("#novel_box").animate({scrollTop: bookmark.scrollTop});
    });

    const novelDrawing = document.querySelector("#novel_drawing");

    if (novelDrawing)
        observer.observe(novelDrawing, {
            childList: true
        });
}