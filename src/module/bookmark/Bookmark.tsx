import {EP_List, HEADER_BAR, NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE, SIDE_LEFT} from "../../util/Selectors";
import {PreviousBookmark} from "./PreviousBookmark";
import {waitElement} from "../../util/WaitElement";
import Cookies from "js-cookie";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import {createGlobalStyle} from "styled-components";

interface IProps {
}

interface IState {
    bookmarks: Bookmarks;
    previousBookmark: PreviousBookmark;
}

class Bookmark extends React.Component<IProps, IState> {
    private PreviousBookmark: PreviousBookmark = GM_getValue("previousBookmark", {});

    constructor(props: IProps) {
        super(props);

        this.state = {
            bookmarks: this.Bookmarks,
            previousBookmark: this.PreviousBookmark
        };
    }

    private _Bookmarks: Bookmarks = GM_getValue("bookmarks", {});

    private get Bookmarks() {
        return this._Bookmarks;
    }

    private set Bookmarks(bookmarks: Bookmarks) {
        GM_setValue("bookmarks", bookmarks);

        this.setState({
            bookmarks: bookmarks
        });
    }

    render() {
        const newState = this.state;

        const bookmarks = newState.bookmarks;
        const previousBookmark = newState.previousBookmark;

        const GlobalStyles = createGlobalStyle`
          .no-overflow a {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .no-drag {
            -ms-user-select: none !important;
            -moz-user-select: none !important;
            -webkit-user-select: none !important;
            -khtml-user-select: none !important;
            user-select: none !important;
          }

          .bookmark div {
            display: flex;
          }

          .bookmark h5 {
            color: red;
            margin-left: 5px;
            margin-right: 5px;
          }
        `;

        const globalStyle: React.CSSProperties = {
            overflow: "auto",
            bottom: 0,
            position: "fixed",
            zIndex: 99999,
            width: "100vw",
            height: "100vh"
        };

        if (Cookies.get("DARKMODE_S") === "1") {
            globalStyle["backgroundColor"] = "#000";
            globalStyle["color"] = "white";
        } else
            globalStyle["backgroundColor"] = "white";

        return (
            <>
                <GlobalStyles/>
                <div className="no-drag" id="bookmark" style={globalStyle}>
                    <h2 style={{marginTop: "5px", textAlign: "center"}}>북마크 관리</h2>

                    <ol className="no-overflow bookmark" id="bookmarkList"
                        style={{
                            height: "85vh",
                            overflow: "auto",
                            fontSize: "15px",
                            marginLeft: "-10px"
                        }}>
                        {Object.entries(bookmarks).map(([key, value]) => <li>
                                <div>
                                    <a onClick={() => $(".loads").show()}
                                       href={key}>{decodeURIComponent(value.chapter)} - {decodeURIComponent(value.title)}</a>
                                    <h5 onClick={(e) => this.deleteBookmark(e)}>X</h5>
                                </div>
                            </li>
                        )}
                    </ol>

                    <div style={{
                        display: "flex",
                        position: "fixed",
                        bottom: "35px",
                        right: "5px"
                    }}>
                        <h5 onClick={() => this.backup()} id="backup">백업</h5>
                        <h5 onClick={() => this.restore()} id="restore" style={{marginLeft: "5px"}}>복원</h5>
                    </div>

                    <div className="no-overflow" style={{
                        display: "flex",
                        position: "fixed",
                        bottom: "-10px",
                        left: "5px"
                    }}>
                        <h5 style={{fontSize: ".83em!important"}}>이전 소설:&nbsp;</h5>

                        <a onClick={() => $(".loads").show()} href={previousBookmark.url ?? "#"} id="lastNovel"
                           style={{
                               marginBottom: "15px",
                               fontSize: ".83em!important",
                               width: "20vh"
                           }}>
                            {previousBookmark.title && previousBookmark.chapter
                                ? `${previousBookmark.chapter} - ${previousBookmark.title}`
                                : "없음"}
                        </a>
                    </div>

                    <div style={{
                        position: "fixed",
                        bottom: "5px",
                        right: "5px"
                    }}>
                        <button onDoubleClick={() => this.reset()} id="reset">초기화</button>
                        <button onClick={() => ReactDOM.unmountComponentAtNode($("#root").get(0)!)}
                                id="close" style={{marginLeft: "5px"}}>닫기
                        </button>
                    </div>
                </div>
            </>
        );
    }

    private deleteBookmark(e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) {
        const bookmarks = this.Bookmarks;
        delete bookmarks[$(e.currentTarget).parent().children("a").attr("href")!];
        this.Bookmarks = bookmarks;
    }

    private backup() {
        const bookmarks = this.Bookmarks;

        if (!Object.keys(bookmarks).length) return;

        GM_setClipboard(JSON.stringify(bookmarks));

        toastr.options = {
            escapeHtml: true,
            closeButton: true,
            newestOnTop: false,
            progressBar: true
        };

        toastr.info("클립보드로 복사되었습니다.", "북마크");
    }

    private restore() {
        const input = prompt("데이터를 입력해주세요: ");

        toastr.options = {
            escapeHtml: true,
            closeButton: true,
            newestOnTop: false,
            progressBar: true
        };

        if (input) {
            this.Bookmarks = JSON.parse(input);
            toastr.info("복원되었습니다.", "북마크");
            return;
        }

        toastr.info("데이터가 비어있습니다.", "북마크");
    }

    private reset() {
        this.Bookmarks = {};
    }
}

export interface Bookmarks {
    [url: string]: {
        scrollTop: number;
        title: string;
        chapter: string;
    };
}

export function isFirst(who: "previous" | "bookmark") {
    const bookmarks: Bookmarks = GM_getValue("bookmarks");
    const previousBookmark: PreviousBookmark = GM_getValue("previousBookmark");

    if (who === "previous")
        return GM_config.get("PreviousBookmark_First") && previousBookmark !== undefined
            ? true
            : !(bookmarks && bookmarks.hasOwnProperty(location.href));

    return !GM_config.get("PreviousBookmark_First") && previousBookmark !== undefined;
}

function removeBookmark(bookmarks: Bookmarks, url: string) {
    delete bookmarks[url];
    GM_setValue("bookmarks", bookmarks);
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

    const appContainer = document.createElement("div");
    appContainer.id = "root";
    document.body.prepend(appContainer);

    const li = $(`<li style="padding: 10px 25px;"><img height=25 src=//image.novelpia.com/img/new/icon/count_book.png></li>`)
        .on("click", () =>
            ReactDOM.render(<Bookmark/>, appContainer)
        );

    $(SIDE_LEFT).append(li);
}

function novelBookmark() {
    if (!/^\/novel\//.test(location.pathname))
        return;

    const bookmarks: Bookmarks = GM_getValue("bookmarks", {});

    const bookmark = Object.entries(bookmarks).filter(([, value]) => decodeURIComponent(value.title) === document.title.split("-")[2].trimLeft()).pop();

    if (bookmark)
        $(`div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("이어보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("첫화보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("신규회차등록")`)
            .parent()
            .append(`<div style="background-color:#6143d1;color:#fff;width:100%;line-height:40px;margin-top:10px;text-align:center;cursor:pointer;" onclick="$('.loads').show();location='${bookmark[0]}';"> <span style="background-color: #7f66de;border: 1px solid #fff;padding: 1px 6px;border-radius: 10px;font-size: 11px; margin-right: 3px;">${bookmark[1].chapter}</span> 북마크 이어보기 </div>`);

    const observer = new MutationObserver(() => {
        for (const element of $(`${EP_List} > table > tbody > tr td:nth-child(2)`)) {
            const $element = $(element);

            const url = /'\/viewer\/(?<url>\d*)'/.exec($element.attr("onclick")!)?.groups!["url"];

            if (!url) continue;

            const bookmark = Object.keys(bookmarks).find(key => key.endsWith(url));

            if (!bookmark) continue;

            $element
                .children("b")
                .children(".ion-bookmark")
                .show();
        }
    });

    observer.observe($(EP_List).get(0)!, {
        childList: true
    });
}

function viewerBookmark() {
    if (!/^\/viewer\//.test(location.pathname))
        return;

    const bookmarks: Bookmarks = GM_getValue("bookmarks", {});

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

            GM_setValue("bookmarks", bookmarks);

            $("#Bookmark").css("color",
                Cookies.get("DARKMODE") === "1"
                    ? "rgb(117, 242, 70)"
                    : "rgb(160, 73, 180)"
            );

            toastr.options = {
                escapeHtml: true,
                closeButton: true,
                newestOnTop: false,
                progressBar: true
            };

            toastr.info("저장되었습니다.", "북마크");
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

    if (!scrollTop || !isFirst("bookmark"))
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