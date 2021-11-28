import React from "react";
import ReactDOM from "react-dom";
import {createGlobalStyle} from "styled-components";
import {EP_List, HEADER_BAR, NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE, SIDE_LEFT} from "../../util/Selectors";
import Cookies from "js-cookie";
import {Bookmarks, isFirst, PreviousBookmark, removeBookmark} from "./util";
import $ from "jquery";
import {waitElement} from "../../util/WaitElement";

interface IProps {
}

interface IState {
    bookmarks: Bookmarks;
    previousBookmark: PreviousBookmark;
    data: string;
    hide: boolean;
}

class Bookmark extends React.Component<IProps, IState> {
    private readonly PreviousBookmark: PreviousBookmark;

    constructor(props: IProps) {
        super(props);

        this._Bookmarks = GM_getValue("bookmarks", {}) as Bookmarks;
        this.PreviousBookmark = GM_getValue("previousBookmark", {}) as PreviousBookmark;

        this.state = {
            bookmarks: this.Bookmarks,
            previousBookmark: this.PreviousBookmark,
            data: "",
            hide: true
        };
    }

    private _Bookmarks: Bookmarks;

    private get Bookmarks() {
        return this._Bookmarks;
    }

    private set Bookmarks(bookmarks: Bookmarks) {
        GM_setValue("bookmarks", bookmarks);
        this._Bookmarks = bookmarks;
        this.setState({bookmarks: bookmarks});
    }

    render() {
        const newState = this.state;

        const bookmarks = newState.bookmarks;
        const hide = newState.hide;

        const previousBookmark = newState.previousBookmark;
        const GlobalStyles = createGlobalStyle`
          * {
            -ms-user-select: none !important;
            -moz-user-select: none !important;
            -webkit-user-select: none !important;
            -khtml-user-select: none !important;
            user-select: none !important;
          }

          .no-overflow {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .no-overflow a {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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
            globalStyle.backgroundColor = "#000";
            globalStyle.color = "white";
        } else
            globalStyle.backgroundColor = "white";

        return (
            <>
                <GlobalStyles/>
                <div style={globalStyle}>
                    {
                        hide
                            ? undefined
                            : <div style={{
                                display: "flex",
                                position: "fixed",
                                left: "50%",
                                top: "50%",
                                transform: "translate(-50%, -50%)"
                            }}>
                                <input onChange={(e) => this.setState({data: e.target.value})}
                                       type="text"
                                       placeholder="데이터를 입력해주세요"/>
                                <button onClick={() => this.restore()} style={{marginLeft: "5px"}}>적용</button>
                                <button onClick={() => this.setState({hide: true})} style={{marginLeft: "5px"}}>취소</button>
                            </div>
                    }

                    <h2 style={{marginTop: "5px", textAlign: "center"}}>북마크 관리</h2>

                    <ol className="no-overflow bookmark"
                        style={{
                            height: "85vh",
                            overflow: "auto",
                            fontSize: "15px",
                            marginLeft: "-10px"
                        }}>
                        {Object.entries(bookmarks).map(([key, value]) =>
                            <li>
                                <div>
                                    <a onClick={() => $(".loads").show()}
                                       href={key}>{value.chapter} - {decodeURIComponent(value.title)}</a>
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
                        <h5 onClick={() => this.backup()}>백업</h5>
                        <h5 onClick={() => this.setState({hide: false})} style={{marginLeft: "5px"}}>복원</h5>
                    </div>

                    <div style={{
                        display: "flex",
                        position: "fixed",
                        bottom: "5px",
                        left: "5px"
                    }}>
                        <h5 style={{fontSize: ".83em"}}>이전 소설:&nbsp;</h5>

                        <a className="no-overflow" onClick={() => $(".loads").show()}
                           href={previousBookmark.url ?? "#"}
                           style={{
                               fontSize: ".83em",
                               width: "20vh"
                           }}>
                            {
                                previousBookmark.title && previousBookmark.chapter
                                    ? `${previousBookmark.chapter} - ${decodeURIComponent(previousBookmark.title)}`
                                    : "없음"
                            }
                        </a>
                    </div>

                    <div style={{
                        position: "fixed",
                        bottom: "5px",
                        right: "5px"
                    }}>
                        <button onDoubleClick={() => this.reset()}>초기화</button>
                        <button onClick={() => ReactDOM.unmountComponentAtNode($("#bookmarkContainer").get(0)!)}
                                style={{marginLeft: "5px"}}>닫기
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
        const data = this.state.data;

        toastr.options = {
            escapeHtml: true,
            closeButton: true,
            newestOnTop: false,
            progressBar: true
        };

        if (data) {
            this.Bookmarks = JSON.parse(data);
            toastr.info("복원되었습니다.", "북마크");
        } else
            toastr.info("데이터가 비어있습니다.", "북마크");

        this.setState({
            hide: true,
            data: ""
        });
    }

    private reset() {
        this.Bookmarks = {};
    }
}

function bookmark() {
    if (/^\/viewer\//.test(location.pathname))
        return;

    const appContainer = document.createElement("div");
    appContainer.id = "bookmarkContainer";
    document.body.prepend(appContainer);

    const li = $(`<li style="padding: 10px 25px;"><img height=25 src=//image.novelpia.com/img/new/icon/count_book.png></li>`)
        .on("click", () =>
            ReactDOM.render(<Bookmark/>, appContainer)
        );

    $(SIDE_LEFT).append(li);
}

function novel() {
    if (!/^\/novel\//.test(location.pathname))
        return;

    const bookmarks = GM_getValue("bookmarks", {}) as Bookmarks;

    const bookmark = Object.entries(bookmarks).filter(([, value]) => decodeURIComponent(value.title) === document.title.split("-")[2].trimLeft()).pop();

    if (bookmark)
        $(`div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("이어보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("첫화보기"), div:not(.s_inv)[onclick*="$('.loads').show();"]:contains("신규회차등록")`)
            .parent()
            .append(`<div style="background-color:#6143d1;color:#fff;width:100%;line-height:40px;margin-top:10px;text-align:center;cursor:pointer;" onclick="$('.loads').show();location='${bookmark[0]}';"> <span style="background-color: #7f66de;border: 1px solid #fff;padding: 1px 6px;border-radius: 10px;font-size: 11px; margin-right: 3px;">${bookmark[1].chapter}</span> 북마크 이어보기 </div>`);

    function addBookmark() {
        for (const element of $(`${EP_List} > table > tbody > tr td:nth-child(2)`)) {
            const $element = $(element);

            const url = /'\/viewer\/(\d*)'/.exec($element.attr("onclick")!)?.[1];

            if (!url) continue;

            const bookmark = Object.keys(bookmarks).find(key => key.endsWith(url));

            if (!bookmark) continue;

            $element
                .children("b")
                .children(".ion-bookmark")
                .show();
        }
    }

    addBookmark();

    const observer = new MutationObserver(addBookmark);

    observer.observe($(EP_List).get(0)!, {
        childList: true
    });
}

function viewer() {
    if (!/^\/novel\//.test(location.pathname))
        return;

    const bookmarks = GM_getValue("bookmarks", {}) as Bookmarks;

    const td = $("<td>")
        .css("text-align", "center")
        .css("font-size", "25px")
        .css("font-style", "12px")
        .css("width", 63)
        .css("z-index", 10000)
        .on("click", () => {
            const scrollTop = $(NOVEL_BOX).scrollTop();

            if (scrollTop === undefined)
                return;

            const chapter = $(NOVEL_EP).text();

            if (!chapter)
                return;

            bookmarks[location.href] = {
                scrollTop: scrollTop,
                title: encodeURIComponent($(NOVEL_TITLE).text()),
                chapter: chapter
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

    if (GM_getValue("Bookmark_OneUse", false))
        removeBookmark(bookmarks, location.href);

    const goto = () => {
        if (!GM_getValue("Bookmark_AutoUse", false) && !confirm("저장해두었던 북마크로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: scrollTop}, 0);
    };

    if ($(NOVEL_DRAWING).children().length > 0) {
        goto();
        return;
    }

    waitElement($(NOVEL_DRAWING).get(0)!, goto);
}

export default {
    enable: ["Bookmark"],
    config: {
        head: "북마크 설정",
        configs: {
            Bookmark: {
                label: "활성화",
                type: "checkbox",
                default: false
            },
            Bookmark_OneUse: {
                label: "북마크 한번만 사용",
                type: "checkbox",
                default: false
            },
            Bookmark_AutoUse: {
                label: "북마크 자동 이동",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        bookmark();
        novel();
        viewer();
    }
} as Module;