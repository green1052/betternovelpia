export function isFirst(who: "previous" | "bookmark") {
    const bookmarks = GM_getValue<Bookmarks>("bookmarks", {});
    const previousBookmark = GM_getValue<PreviousBookmark | undefined>("previousBookmark", undefined);

    if (who === "previous")
        return GM_getValue<boolean>("PreviousBookmark_First", false) && previousBookmark !== undefined
            ? true
            : !(bookmarks && bookmarks.hasOwnProperty(location.href));

    return !GM_getValue<boolean>("PreviousBookmark_First", false) && previousBookmark !== undefined;
}