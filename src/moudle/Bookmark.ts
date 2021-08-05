import $ from "jquery";

export default {start};

interface Bookmark {
    scrollTop: number,
    title: string,
    chapter: string
}

interface Bookmarks {
    [key: string]: Bookmark
}

interface PreviousBookmark {
    url: string,
    scrollTop: number;
}

function setBookmark(bookmarks: Bookmarks, url: string, scrollTop: number, title: string, chapter: string) {
    const json: Bookmarks = bookmarks ?? {};

    json[url] = {
        scrollTop: scrollTop,
        title: encodeURIComponent(title),
        chapter: encodeURIComponent(chapter)
    };

    GM.setValue("bookmarks", json);
}

function removeBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    GM.setValue("bookmarks", bookmarks);
}

function waitNovelDrawing(dom: HTMLElement, code: Function) {
    if (!dom)
        return;

    const observer = new MutationObserver(() => {
        observer.disconnect();
        code();
    });

    observer.observe(dom, {childList: true});
}

async function isFirst(who: "previous" | "bookmark"): Promise<boolean> {
    const bookmarks: Bookmarks = await GM.getValue("bookmarks");
    const previousBookmark: PreviousBookmark = await GM.getValue("previousBookmark");

    if (who === "previous")
        return GM_config.get("PreviousBookmark_First") && previousBookmark !== undefined ? true : !(bookmarks && bookmarks.hasOwnProperty(location.href));

    return !GM_config.get("PreviousBookmark_First") && previousBookmark !== undefined;
}

async function start() {
    await previousBookmark();

    addMainBookmarkButton();
    await addViewerBookmarkButton();
}

async function previousBookmark() {
    if (!GM_config.get("PreviousBookmark") || !location.pathname.includes("/viewer/"))
        return;

    const bookmark = await GM.getValue("previousBookmark") as PreviousBookmark;

    let lastScrollTop: number;

    setInterval(() => {
        const scrollTop = $("#novel_box").scrollTop()!;

        if (!scrollTop || scrollTop === lastScrollTop)
            return;

        lastScrollTop = scrollTop;

        GM.setValue("previousBookmark", {url: location.href, scrollTop: lastScrollTop} as PreviousBookmark);
    }, 500);

    if (!bookmark || location.href !== bookmark.url)
        return;

    if (!await isFirst("previous"))
        return;

    if (GM_config.get("PreviousBookmark_OnlyUse"))
        GM.setValue("previousBookmark", {});

    if (!bookmark.scrollTop)
        return;

    waitNovelDrawing($("#novel_drawing").get(0), () => {
        if (!GM_config.get("PreviousBookmark_AutoUse"))
            if (!confirm("읽던 부분으로 이동하시겠습니까?"))
                return;

        $("#novel_box").animate({scrollTop: bookmark.scrollTop}, 0);
    });
}

function addMainBookmarkButton() {
    if (!GM_config.get("Bookmark") || location.pathname.includes("/viewer/"))
        return;

    const li = $("<li>")
        .css("padding", "10px 25px")
        .on("click", async () => {
            const bookmarks: Bookmarks = await GM.getValue("bookmarks");

            let str = "숫자를 입력해 북마크 삭제\n00. 초기화\n0. 취소\n";
            let index = 0;

            for (const key in bookmarks) {
                if (!bookmarks.hasOwnProperty(key))
                    continue;

                index++;

                const bookmark: Bookmark = bookmarks[key];

                const title = decodeURIComponent(bookmark.title);
                const chapter = decodeURIComponent(bookmark.chapter);

                str += `${index}. ${title} - ${chapter}\n`;
            }

            const input = prompt(str);

            if (!input)
                return;

            if (input === "00") {
                GM.setValue("bookmarks", {});
                return alert("초기화 했습니다.");
            }

            const number = Number(input);

            if (isNaN(number) || number === 0)
                return;

            removeBookmark(bookmarks, Object.keys(bookmarks)[number - 1]);
            alert("삭제 됐습니다.");
        })
        .append(`<a><img height="25" src="https://image.novelpia.com/img/new/icon/count_book.png"></a>`);

    $(".am-sideleft > div:nth-child(1) > ul:nth-child(1)").append(li);
}

async function addViewerBookmarkButton() {
    if (!GM_config.get("Bookmark") || !location.pathname.includes("/viewer/"))
        return;

    const img = $(`<img id="btn_theme" class="footer_btn" src="https://image.novelpia.com/img/new/icon/count_book.png">`);

    const td = $("<td>")
        .css("text-align", "center")
        .css("font-style", "12px")
        .css("width", 63)
        .css("z-index", 10000)
        .on("click", async () => {
            const scrollTop = $("#novel_box").scrollTop();

            if (scrollTop === undefined)
                return;

            if (scrollTop === 0)
                return alert("스크롤을 해야 저장할 수 있습니다.");

            const bookmarks: Bookmarks = await GM.getValue("bookmarks");

            const title = $("b.cut_line_one").text();
            const chapter = $("span.cut_line_one > span:nth-child(1)").text();

            if (!title || !chapter)
                return alert("제목 또는 챕터 값이 비어있습니다.");

            setBookmark(bookmarks, location.href, scrollTop, title, chapter);

            alert("저장되었습니다.");
        })
        .append(img);

    $("#header_bar > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1)")
        .children().eq(6).before(td);

    const bookmarks: Bookmarks = await GM.getValue("bookmarks");

    if (!bookmarks)
        return;

    const scrollTop = bookmarks[location.href]?.scrollTop;

    if (!scrollTop)
        return;

    if (!await isFirst("bookmark"))
        return;

    if (GM_config.get("Bookmark_OnlyUse")) {
        removeBookmark(bookmarks, location.href);
        GM.setValue("bookmarks", bookmarks);
    }

    waitNovelDrawing($("#novel_drawing").get(0), () => {
        if (!GM_config.get("Bookmark_AutoUse"))
            if (!confirm("저장해두었던 북마크로 이동하시겠습니까?"))
                return;

        $("#novel_box").animate({scrollTop: scrollTop}, 0);
    });
}