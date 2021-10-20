// @ts-ignore
import BookmarkHtml from "../../html/bookmark.html";
import {EP_List, HEADER_BAR, NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE, SIDE_LEFT} from "../../util/Selectors";
import {PreviousBookmark} from "./PreviousBookmark";
import {waitElement} from "../../util/WaitElement";
import Cookies from "js-cookie";
import $ from "jquery";

export interface Bookmarks {
    [url: string]: {
        scrollTop: number;
        title: string;
        chapter: string;
    };
}

export async function isFirst(who: "previous" | "bookmark") {
    const bookmarks: Bookmarks = await GM.getValue("bookmarks");
    const previousBookmark: PreviousBookmark = await GM.getValue("previousBookmark");

    if (who === "previous")
        return GM_config.get("PreviousBookmark_First") && previousBookmark !== undefined ? true : !(bookmarks && bookmarks.hasOwnProperty(location.href));

    return !GM_config.get("PreviousBookmark_First") && previousBookmark !== undefined;
}

function removeBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    GM.setValue("bookmarks", bookmarks);
}

export default {
    enable: ["Bookmark"],
    start() {
        mainBookmark();
        novelBookmark();
        viewerBookmark();
    }
} as Module;

function mainBookmark() {
    if (/^\/viewer\//.test(location.pathname))
        return;

    const li = $(`<li style="padding: 10px 25px;"><img height="25" src="//image.novelpia.com/img/new/icon/count_book.png"></li>`)
        .on("click", async () => {
            $(document.body).prepend(BookmarkHtml);

            const refresh = async () => {
                const previousBookmark: PreviousBookmark = await GM.getValue("previousBookmark", {});

                if (previousBookmark.title && previousBookmark.chapter && previousBookmark.url)
                    $("#lastNovel")
                        .attr("href", previousBookmark.url)
                        .html(`${previousBookmark.chapter} - ${previousBookmark.title}`);

                const bookmarks: Bookmarks = await GM.getValue("bookmarks", {});

                const $bookmarkList = $("#bookmarkList").empty();

                for (const [key, value] of Object.entries(bookmarks)) {
                    const title = decodeURIComponent(value.title);
                    const chapter = decodeURIComponent(value.chapter);

                    const $li = $(`<li><div><a href="${key}">${chapter} - ${title}</a></div></li>`);

                    $li.children("div").append(
                        $(`<h5>X</h5>`).on("click", function () {
                            $(this).parent().parent().remove();
                            removeBookmark(bookmarks, key);
                        })
                    );

                    $bookmarkList.append($li);
                }
            };

            await refresh();

            $("#reset").on("dblclick", () => {
                GM.setValue("bookmarks", {});
                $("#bookmarkList").empty();
            });

            $("#backup").on("click", async () => {
                const bookmarks = await GM.getValue("bookmarks");
                if (!Object.keys(bookmarks).length) return;
                GM.setClipboard(JSON.stringify(bookmarks));
                alert("클립보드로 복사되었습니다.");
            });

            $("#restore").on("click", () => {
                const input = prompt("데이터를 입력해주세요: ");

                if (!input) {
                    alert("데이터가 비어있습니다.");
                    return;
                }

                GM.setValue("bookmarks", JSON.parse(input));
                refresh();
            });
        });

    $(SIDE_LEFT).append(li);
}

async function novelBookmark() {
    if (!/^\/novel\//.test(location.pathname))
        return;

    const bookmarks: Bookmarks = await GM.getValue("bookmarks", {});

    const bookmark = Object.entries(bookmarks).filter(([, value]) => decodeURIComponent(value.title) === document.title.split("-")[2].trimLeft()).pop();

    if (bookmark)
        $(`div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("이어보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("첫화보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("신규회차등록")`)
            .parent()
            .append(`<div style="background-color:#6143d1;color:#fff;width:100%;line-height:40px;margin-top:10px;text-align:center;cursor:pointer;" onclick="$('.loads').show();location='${bookmark[0]}';"> <span style="background-color: #7f66de;border: 1px solid #fff;padding: 1px 6px;border-radius: 10px;font-size: 11px; margin-right: 3px;">${bookmark[1].chapter}</span> 북마크 이어보기 </div>`);

    const observer = new MutationObserver(async () => {
        const bookmarks: Bookmarks = await GM.getValue("bookmarks", {});

        for (const element of $(`${EP_List} > table > tbody > tr td:nth-child(2)`)) {
            const $element = $(element);
            const url = /'\/viewer\/(?<url>\d*)';$/.exec($element.attr("onclick")!)?.groups!["url"];

            if (!url)
                continue;

            const bookmark = Object.keys(bookmarks).find(key => key.endsWith(url));

            if (!bookmark) return;

            $element
                .children("b")
                .children(".icon")
                .show();
        }
    });

    observer.observe($(EP_List).get(0)!, {
        childList: true
    });
}

async function viewerBookmark() {
    if (!/^\/viewer\//.test(location.pathname))
        return;

    const bookmarks: Bookmarks = await GM.getValue("bookmarks", {});

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

            bookmarks[location.href] = {
                scrollTop: scrollTop,
                title: encodeURIComponent($(NOVEL_TITLE).text()),
                chapter: encodeURIComponent($(NOVEL_EP).text())
            };

            GM.setValue("bookmarks", bookmarks);

            $("#Bookmark").css("color",
                Cookies.get("DARKMODE") === "1"
                    ? "rgb(117, 242, 70)"
                    : "rgb(160, 73, 180)"
            );

            alert("저장되었습니다.");
        })
        .append(
            $(`<i id="Bookmark" class="icon ion-bookmark">`)
                .css("color",
                    bookmarks?.hasOwnProperty(location.href)
                        ? Cookies.get("DARKMODE") === "1"
                            ? "rgb(117, 242, 70)"
                            : "rgb(160, 73, 180)"
                        : Cookies.get("DARKMODE") === "1"
                            ? "#ffffff7a"
                            : "#0000007a"
                )
        );

    $(HEADER_BAR).children().eq(6).before(td);

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

    if ($(NOVEL_DRAWING).children().length > 0) {
        goto();
        return;
    }

    waitElement($(NOVEL_DRAWING).get(0), goto);
}