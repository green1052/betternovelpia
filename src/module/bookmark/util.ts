export interface Bookmarks {
    [url: string]: {
        scrollTop: number;
        title: string;
        chapter: string;
    };
}

export interface PreviousBookmark {
    title: string;
    chapter: string;
    url: string;
    scrollTop: number;
}

export function isFirst(who: "previous" | "bookmark") {
    const bookmarks = GM_getValue("bookmarks", {}) as Bookmarks;
    const previousBookmark = GM_getValue("previousBookmark", {}) as PreviousBookmark;

    if (who === "previous")
        return GM_getValue("PreviousBookmark_First", false) && previousBookmark !== undefined
            ? true
            : !(bookmarks && bookmarks.hasOwnProperty(location.href));

    return !GM_getValue("PreviousBookmark_First", false) && previousBookmark !== undefined;
}

export function removeBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    GM_setValue("bookmarks", bookmarks);
}