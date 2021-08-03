export default {Start};
import $ from "jquery";

interface Bookmarks {
    [key: string]: Bookmark
}

interface Bookmark {
    scrollTop: number,
    title: string,
    chapter: string
}

function SetBookmark(bookmarks: Bookmarks, url: string, scrollTop: number, title: string, chapter: string) {
    const json: Bookmarks = bookmarks ?? {};

    json[url] = {
        scrollTop: scrollTop,
        title: encodeURIComponent(title),
        chapter: encodeURIComponent(chapter)
    };

    GM.setValue("bookmarks", json);
}

function RemoveBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    GM.setValue("bookmarks", bookmarks);
}

async function Start() {
    if (!GM_config.get("Bookmark"))
        return;

    await Main();
    await Reader();
}

async function Main() {
    if (location.pathname.includes("/viewer/"))
        return;

    const img = $(`<img src="https://image.novelpia.com/img/new/icon/count_book.png">`)
        .css("height", 25);

    const a = $("<a>")
        .append(img);

    const li = $("<li>")
        .css("padding", "10px 25px")
        .on("click", async () => {
            const bookmarks = await GM.getValue("bookmarks") as unknown as Bookmarks;

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

            RemoveBookmark(bookmarks, Object.keys(bookmarks)[number - 1]);
            alert("삭제 됐습니다.");
        })
        .append(a);

    $(".am-sideleft > div:nth-child(1) > ul:nth-child(1)").append(li);
}

async function Reader() {
    if (!location.pathname.includes("/viewer/"))
        return;

    const img = $(`<img id="btn_theme" class="footer_btn" src="https://image.novelpia.com/img/new/icon/count_book.png">`);

    const td = $("<td>")
        .css("text-align", "center")
        .css("font-style", "12px")
        .css("width", 63)
        .css("z-index", 10000)
        .on("click", async () => {
            const url = location.href;
            const scrollTop = $("#novel_box").scrollTop() ?? 0;

            if (!scrollTop)
                return;

            const bookmarks = await GM.getValue("bookmarks") as unknown as Bookmarks;

            const title = $("b.cut_line_one").text();
            const chapter = $("span.cut_line_one > span:nth-child(1)").text();

            if (!title || !chapter)
                return alert("제목 또는 챕터 값이 비어있습니다.");

            SetBookmark(bookmarks, url, scrollTop, title, chapter);

            alert("저장되었습니다.");
        })
        .append(img);

    $("#header_bar > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1)")
        .children().eq(6).before(td);

    const bookmarks = await GM.getValue("bookmarks") as unknown as Bookmarks;

    if (!bookmarks)
        return;

    const scrollTop = bookmarks[location.href]?.scrollTop;

    if (!scrollTop)
        return;

    const tempBookmark = await GM.getValue("tempBookmark") as unknown as { url: string, scrollTop: number };

    if (GM_config.get("PreviousBookmark_First") && tempBookmark)
        return;

    if (GM_config.get("Bookmark_OnlyUse")) {
        RemoveBookmark(bookmarks, location.href);
        GM.setValue("bookmarks", bookmarks);
    }

    const observer = new MutationObserver(() => {
        observer.disconnect();

        if (!GM_config.get("Bookmark_AutoUse"))
            if (!confirm("저장해두었던 북마크로 이동하시겠습니까?"))
                return;

        $("#novel_box").animate({scrollTop: scrollTop});
    });

    const novelDrawing = document.querySelector("#novel_drawing");

    if (novelDrawing)
        observer.observe(novelDrawing, {
            childList: true
        });
}