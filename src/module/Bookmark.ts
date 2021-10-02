import $ from "jquery";
import {waitElement} from "../util/WaitElement";
import {HEADER_BAR, NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE, SIDE_LEFT} from "../util/Selectors";

interface Bookmarks {
    [key: string]: {
        scrollTop: number,
        title: string,
        chapter: string
    };
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

export default {
    async start() {
        await previousBookmark();

        addMainBookmarkButton();
        await addViewerBookmarkButton();
    }
} as Module;

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

    if ($(NOVEL_DRAWING).children().length > 0)
        return goto();

    waitElement($(NOVEL_DRAWING).get(0), () => goto());
}

function addMainBookmarkButton() {
    if (!GM_config.get("Bookmark") || location.pathname.includes("/viewer/"))
        return;

    const li = $("<li>")
        .css("padding", "10px 25px")
        .on("click", async () => {
            const bookmarkHtml = $(`<div style=overflow:auto;bottom:0;position:fixed;z-index:99999;width:100vw;height:100vh;background-color:#fff id=Bookmark><style>.no-drag{-ms-user-select:none;-moz-user-select:-moz-none;-webkit-user-select:none;-khtml-user-select:none;user-select:none}.bookmark div{display:flex;align-items:center}.bookmark h5{color:red;margin-left:10px;margin-right:5px}</style><h2 class=no-drag style=margin-top:10px;text-align:center>북마크 관리</h2><ol class="no-drag bookmark"id=BookmarkList style=font-size:15px;margin-left:5px></ol><div style=display:flex;position:absolute;bottom:35px;right:5px class=no-drag><h5 id=Backup>백업</h5><h5 id=Restore style=margin-left:5px>복원</h5></div><div style=position:absolute;bottom:5px;right:5px class=no-drag><button id=Reset>초기화</button> <button id=Close onclick='$("#Bookmark").remove()'>닫기</button></div></div>`);

            $(document.body).prepend(bookmarkHtml);

            const refresh = (bookmarks: Bookmarks) => {
                $("#BookmarkList").empty();

                for (const [key, value] of Object.entries(bookmarks)) {
                    const title = decodeURIComponent(value.title);
                    const chapter = decodeURIComponent(value.chapter);

                    const $li = $(`<li><div><a href="${key}">${title} - ${chapter}</a></div></li>`);

                    $("#BookmarkList").append($li);

                    const $a = $(`<h5>X</h5>`).on("click", function () {
                        const $li = $(this).parent().parent();
                        removeBookmark(bookmarks, key);
                        $li.remove();
                    });

                    $li.children("div").append($a);
                }
            };

            refresh(await GM.getValue("bookmarks") ?? {});

            $("#Reset").on("dblclick", () => {
                GM.setValue("bookmarks", {});
                $("#BookmarkList").empty();
            });

            $("#Backup").on("click", async () => {
                GM.setClipboard(JSON.stringify(await GM.getValue("bookmarks") ?? {}));
                alert("클립보드로 복사되었습니다.");
            });

            $("#Restore").on("click", async () => {
                const input = prompt("데이터를 입력해주세요: ");

                if (!input)
                    return alert("데이터가 비어있습니다.");

                GM.setValue("bookmarks", JSON.parse(input));
                refresh(await GM.getValue("bookmarks") ?? {});
            });
        })
        .append(`<a><img height="25" src="//image.novelpia.com/img/new/icon/count_book.png"></a>`);

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
            const chapter = $(NOVEL_EP).text().replace(/^19/, "");

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