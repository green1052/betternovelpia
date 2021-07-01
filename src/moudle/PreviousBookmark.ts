export default {Start};
import Config from "../Config";

interface Bookmark {
    url: string,
    scrollTop: number
}

async function Start() {
    if (!Config.GetConfig("PreviousBookmark") || !location.pathname.includes("/viewer/"))
        return;

    let lastScrollTop: number;

    setInterval(() => {
        const scrollTop = $("#novel_box").scrollTop() ?? 0;

        if (!scrollTop || scrollTop === lastScrollTop)
            return;

        lastScrollTop = scrollTop;

        Config.SetValue("tempBookmark", {url: location.href, scrollTop: scrollTop});
    }, 1000);

    const bookmark: Bookmark = await Config.GetValue("tempBookmark");

    if (!bookmark || location.href !== bookmark.url)
        return;

    const bookmarks = await Config.GetValue("bookmarks");

    if (!Config.GetConfig("PreviousBookmark_First") && (bookmarks && bookmarks.hasOwnProperty(location.href)))
        return;

    if (Config.GetConfig("PreviousBookmark_OnlyUse"))
        Config.SetValue("tempBookmark", {});

    if (!bookmark.scrollTop)
        return;

    setTimeout(() => {
        if (!Config.GetConfig("PreviousBookmark_AutoUse"))
            if (!confirm("읽던 부분으로 이동하시겠습니까?"))
                return;

        $("#novel_box").animate({scrollTop: bookmark.scrollTop});
    }, 3000);
}