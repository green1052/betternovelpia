import $ from "jquery";
import {waitElement} from "../util/WaitElement";
import {HEADER_BAR, NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE, SIDE_LEFT} from "../util/Selectors";

export default {start};

interface Bookmarks {
    [key: string]: Bookmark;
}

interface Bookmark {
    scrollTop: number,
    title: string,
    chapter: string
}

interface PreviousBookmark {
    url: string,
    scrollTop: number
}

function removeBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    GM.setValue("bookmarks", bookmarks);
}

async function isFirst(who: "previous" | "bookmark") {
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

    let lastScrollTop = 0;

    setInterval(() => {
        const scrollTop = $(NOVEL_BOX).scrollTop();

        if (!scrollTop || scrollTop === lastScrollTop)
            return;

        GM.setValue("previousBookmark", {url: location.href, scrollTop: scrollTop} as PreviousBookmark);
        lastScrollTop = scrollTop;
    }, 1000);

    const bookmark: PreviousBookmark = await GM.getValue("previousBookmark");

    if (!bookmark || location.href !== bookmark.url || !await isFirst("previous"))
        return;

    if (GM_config.get("PreviousBookmark_OneUse"))
        GM.setValue("previousBookmark", {});

    const goto = () => {
        if (!GM_config.get("PreviousBookmark_AutoUse") && !confirm("읽던 부분으로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: bookmark.scrollTop}, 0);
    };

    if ($(NOVEL_DRAWING).children().length > 0) {
        goto();
        return;
    }

    waitElement($(NOVEL_DRAWING).get(0), () => goto());
}

function addMainBookmarkButton() {
    if (!GM_config.get("Bookmark") || location.pathname.includes("/viewer/"))
        return;

    /*
      <div id="Bookmark" style="overflow: auto; bottom: 0; position: fixed; z-index: 1001; width: 100vw; height: 100vh; background-color: white;">
             <div style="margin-top: 5px; text-align: center;">
                <h2>북마크 관리</h2>
             </div>

            <div style="height: 20px;"></div>

            <ol id="BookmarkList" style="font-size: 20px; margin-left: 5px;">
                <li>레후</li>
            </ol>

            <div style="position: absolute; right: 0; bottom: 0; margin-right: 5px; margin-bottom: 5px;">
                <button id="Reset">초기화</button>
                <button id="Close">닫기</button>
            </div>
        </div>
     */

    const li = $("<li>")
        .css("padding", "10px 25px")
        .on("click", async () => {
            const bookmarkHtml = $(`<div id="Bookmark" style="overflow: auto; bottom: 0; position: fixed; z-index: 1001; width: 100vw; height: 100vh; background-color: white;"> <div style="margin-top: 5px; text-align: center;"> <h2>북마크 관리</h2> </div><div style="height: 20px;"></div><ol id="BookmarkList" style="font-size: 20px; margin-left: 5px;"></ol> <div style="position: absolute; right: 0; bottom: 0; margin-right: 5px; margin-bottom: 5px;"> <button id="Reset">초기화</button> <button id="Close">닫기</button> </div></div>`);
            const bookmarks: Bookmarks = await GM.getValue("bookmarks") ?? {};

            $(document.body).prepend(bookmarkHtml);

            Object.values(bookmarks).forEach((bookmark, index) => {
                const title = decodeURIComponent(bookmark.title);
                const chapter = decodeURIComponent(bookmark.chapter);

                const $li = $(`<li><div><a href="${Object.keys(bookmarks)[index]}">${title} - ${chapter}</a></div></li>`);

                $li.children("div")
                    .css("display", "flex")
                    .css("align-items", "center");

                $("#BookmarkList").append($li);

                const $a = $(`<a href="#">X</a>`)
                    .css("color", "red")
                    .css("margin-left", "10px")
                    .css("font-size", "15px")
                    .on("click", function () {
                        const $li = $(this).parent().parent();

                        removeBookmark(bookmarks, Object.keys(bookmarks)[$li.index()]);
                        $li.remove();
                    });

                $li.children("div").append($a);
            });

            $("#Reset").on("click", () => {
                GM.setValue("bookmarks", {});
                $("#BookmarkList").empty();
            });

            $("#Close").on("click", () => $("#Bookmark").remove());
        })
        .append(`<a><img height="25" src="//image.novelpia.com/img/new/icon/count_book.png" alt=""></a>`);

    $(SIDE_LEFT).append(li);
}

async function addViewerBookmarkButton() {
    if (!GM_config.get("Bookmark") || !location.pathname.includes("/viewer/"))
        return;

    const td = $("<td>")
        .css("text-align", "center")
        .css("font-size", "25px")
        .css("font-style", "12px")
        .css("width", 63)
        .css("z-index", 10000)
        .on("click", async () => {
            const scrollTop = $("#novel_box").scrollTop();

            if (scrollTop === undefined)
                return;

            if (scrollTop === 0)
                return alert("스크롤을 해야 저장할 수 있습니다.");

            const bookmarks: Bookmarks = await GM.getValue("bookmarks") ?? {};

            const title = $(NOVEL_TITLE).text();
            const chapter = $(NOVEL_EP).text();

            if (!title || !chapter)
                return alert("제목 또는 챕터 값이 비어있습니다.");

            bookmarks[location.href] = {
                scrollTop: scrollTop,
                title: encodeURIComponent(title),
                chapter: encodeURIComponent(chapter)
            };

            GM.setValue("bookmarks", bookmarks);

            alert("저장되었습니다.");
        })
        .append(`<i id="Bookmark" class="icon ion-bookmark">`);

    $(HEADER_BAR).children().eq(6).before(td);

    const bookmarks: Bookmarks = await GM.getValue("bookmarks");

    if (!bookmarks)
        return;

    const scrollTop = bookmarks[location.href]?.scrollTop;

    if (!scrollTop || !await isFirst("bookmark"))
        return;

    if (GM_config.get("Bookmark_OneUse"))
        removeBookmark(bookmarks, location.href);

    const goto = () => {
        if (!GM_config.get("Bookmark_AutoUse") && !confirm("저장해두었던 북마크로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: scrollTop}, 0);
    };

    if ($(NOVEL_DRAWING).children().length > 0)
        return goto();

    waitElement($(NOVEL_DRAWING).get(0), () => goto());
}