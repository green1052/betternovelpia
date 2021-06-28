export default {Start};
import Config from "../Config";

interface Bookmarks {
    [key: string]: Bookmark
}

type Bookmark = {
    scrollTop: number,
    title: string,
    chapter: string
}

function SetBookmark(bookmarks: Bookmarks, url: string, scrollTop: number, title: string, chapter: string) {
    const json: any = bookmarks ?? {};
    json[url] = {scrollTop: scrollTop, title: encodeURIComponent(title), chapter: encodeURIComponent(chapter)};

    Config.SetValue("bookmarks", json);
}

function RemoveBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    Config.SetValue("bookmarks", bookmarks);
}

async function Start() {
    if (!Config.GetConfig("Bookmark"))
        return;

    await Main();
    await Reader();
}

async function Main() {
    if (location.pathname.includes("/viewer/"))
        return;

    const img = document.createElement("img");
    img.src = "https://image.novelpia.com/img/new/icon/count_book.png";
    img.height = 25;

    const a = document.createElement("a");
    a.innerHTML = img.outerHTML;

    const li = document.createElement("li");
    li.style.padding = "10px 25px";
    li.innerHTML = a.outerHTML;
    li.onclick = async () => {
        const bookmarks: Bookmarks = await Config.GetValue("bookmarks");

        let str = "숫자를 입력해 북마크 삭제\n00. 전부 삭제\n0. 취소\n";
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

        const number = Number(input);

        if (isNaN(number))
            return;

        if (number === 0)
            return;

        if (input === "00")
            return Config.SetValue("bookmarks", {});

        RemoveBookmark(bookmarks, Object.keys(bookmarks)[number - 1]);
        alert("삭제 됐습니다.");
    };

    $(".am-sideleft > div:nth-child(1) > ul:nth-child(1)").append(li);
}

async function Reader() {
    if (!location.pathname.includes("/viewer/"))
        return;

    const img = document.createElement("img");
    img.id = "btn_theme";
    img.className = "footer_btn";
    img.src = "https://image.novelpia.com/img/new/icon/count_book.png";

    const td = document.createElement("td");
    td.style.textAlign = "center";
    td.style.fontStyle = "12px";
    td.style.width = "63px";
    td.style.zIndex = "10000";

    td.innerHTML = img.outerHTML;
    td.onclick = async () => {
        const url = location.href;
        const scrollTop = $("#novel_box").scrollTop();

        if (!scrollTop)
            return;

        const bookmarks: Bookmarks = await Config.GetValue("bookmarks");

        const title = $("b.cut_line_one").text() ?? "오류";
        const chapter = $("span.cut_line_one > span:nth-child(1)").text() ?? "오류";

        SetBookmark(bookmarks, url, scrollTop, title, chapter);

        alert("저장되었습니다.");
    };

    const query = document.querySelector("#header_bar > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1)");

    if (query)
        query.insertBefore(td, query.children[6]);

    const bookmarks: Bookmarks = await Config.GetValue("bookmarks");

    if (!bookmarks)
        return;

    const scrollTop = bookmarks[location.href]?.scrollTop;

    if (!scrollTop)
        return;

    const tempBookmark: { url: string, scrollTop: number } = await Config.GetValue("tempBookmark");

    if (Config.GetConfig("PreviousBookmark_First") && tempBookmark)
        return;

    if (Config.GetConfig("Bookmark_OnlyUse")) {
        RemoveBookmark(bookmarks, location.href);
        Config.SetValue("bookmarks", bookmarks);
    }

    setTimeout(() => {
        if (!Config.GetConfig("Bookmark_AutoUse"))
            if (!confirm("저장해두었던 북마크로 이동하시겠습니까?"))
                return;

        $("#novel_box").animate({scrollTop: scrollTop});
    }, 3000);
}