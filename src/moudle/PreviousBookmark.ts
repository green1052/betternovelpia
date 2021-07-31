export default {Start};
import $ from "jquery";

interface Bookmark {
    url: string,
    scrollTop: number
}

async function Start() {
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

    const bookmark: Bookmark = await GM.getValue("tempBookmark");

    if (!bookmark || location.href !== bookmark.url)
        return;

    const bookmarks = await GM.getValue("bookmarks");

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

    observer.observe(document.querySelector("#novel_drawing")!, {
        childList: true
    });
}