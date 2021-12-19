import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import styled, {createGlobalStyle, css} from "styled-components";
import {EP_List, NOVEL_BOX, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE} from "../../util/Selectors";
import {Bookmarks, isFirst, PreviousBookmark, removeBookmark} from "../../util/Bookmark";
import $ from "jquery";
import toastr from "toastr";
import {element} from "../../util/Element";
import {appendHeader} from "../../util/AppendHeader";
import {isDarkMode} from "../../util/IsDarkMode";
import {isPageViewer} from "../../util/IsPageViewer";
import {appendSide} from "../../util/AppendSide";

function Bookmark() {
    const [bookmarks, setBookmarks] = useState((GM_getValue("bookmarks", {}) as Bookmarks));
    const [previousBookmark] = useState((GM_getValue("previousBookmark", {}) as PreviousBookmark));
    const [hide, setHide] = useState(true);
    const [inputHide, setInputHide] = useState(true);
    const [data, setData] = useState("");

    useEffect(() =>
            appendSide($(`<li style="padding: 10px 25px;"><span style="width:20px;display: inline-block;text-align:center;"><i class="icon ion-bookmark"></i></span> 북마크</li>`)
                .on("click", () => setHide(false)))
        , []);

    const deleteBookmark = useCallback((url: string) => {
        const bookmarks1 = {...bookmarks};
        delete bookmarks1[url];
        setBookmarks(bookmarks1);
    }, [bookmarks]);

    const backup = useCallback(() => {
        if (!Object.keys(bookmarks).length) return;

        GM_setClipboard(JSON.stringify(bookmarks));

        toastr.info("클립보드로 복사되었습니다.", "북마크");
    }, [bookmarks]);

    const restore = useCallback(() => {
        if (data) {
            setBookmarks(JSON.parse(data));
            toastr.info("복원되었습니다.", "북마크");
        } else
            toastr.info("데이터가 비어있습니다.", "북마크");

        setInputHide(true);
        setData("");
    }, [data]);

    const reset = useCallback(() => setBookmarks({}), []);

    const quit = useCallback(() => {
        GM_setValue("bookmarks", bookmarks);
        setHide(true);
    }, [bookmarks]);

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

    const MainDiv = styled.div`
      overflow: auto;
      bottom: 0;
      position: fixed;
      z-index: 99999;
      width: 100vw;
      height: 100vh;
      ${hide && css`display: none;`};
      ${isDarkMode()
              ? css`background-color: #000;
                color: white;`
              : css`background-color: white;`};
    `;

    return (
        <>
            <MainDiv>
                <GlobalStyles/>
                {
                    !inputHide && <div style={{
                        display: "flex",
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <input onChange={(e) => setData(e.target.value)}
                               value={data}
                               type="text"
                               placeholder="데이터를 입력해주세요"/>
                        <button onClick={restore} style={{marginLeft: "5px"}}>적용</button>
                        <button onClick={() => setInputHide(true)} style={{marginLeft: "5px"}}>취소</button>
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
                    {
                        Object.entries(bookmarks).map(([key, value]) =>
                            <li>
                                <div>
                                    <a onClick={() => $(".loads").show()}
                                       href={key}>{value.chapter} - {decodeURIComponent(value.title)}</a>
                                    <h5 onClick={() => deleteBookmark(key)}>X</h5>
                                </div>
                            </li>
                        )
                    }
                </ol>

                <div style={{
                    display: "flex",
                    position: "fixed",
                    bottom: "35px",
                    right: "5px"
                }}>
                    <h5 onClick={backup}>백업</h5>
                    <h5 onClick={() => setInputHide(false)} style={{marginLeft: "5px"}}>복원</h5>
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
                    <button onDoubleClick={reset}>초기화</button>
                    <button onClick={quit} style={{marginLeft: "5px"}}>
                        닫기
                    </button>
                </div>
            </MainDiv>
        </>
    );
}

function bookmark() {
    if (/^\/viewer\//.test(location.pathname))
        return;

    const appContainer = document.createElement("div");
    document.body.prepend(appContainer);
    ReactDOM.render(<Bookmark/>, appContainer);
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

            if (!Object.keys(bookmarks).find(key => key.endsWith(url))) continue;

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
    if (!/^\/viewer\//.test(location.pathname))
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
                isDarkMode()
                    ? "rgb(117, 242, 70)"
                    : "rgb(160, 73, 180)"
            );

            toastr.info("저장되었습니다.", "북마크");
        })
        .append(
            $(`<i id="Bookmark" class="icon ion-bookmark">`)
                .css("color",
                    bookmarks?.hasOwnProperty(location.href)
                        ? isDarkMode()
                            ? "rgb(117, 242, 70)"
                            : "rgb(160, 73, 180)"
                        : isDarkMode()
                            ? "#ffffff7a"
                            : "#0000007a"
                )
        );

    appendHeader(td);

    if (!bookmarks)
        return;

    const scrollTop = bookmarks[location.href]?.scrollTop;

    if (!scrollTop || !isFirst("bookmark"))
        return;

    if (GM_getValue("Bookmark_OneUse", false))
        removeBookmark(bookmarks, location.href);

    element($(NOVEL_DRAWING), () => {
        if (!GM_getValue("Bookmark_AutoUse", false) && !confirm("저장해두었던 북마크로 이동하시겠습니까?")) return;
        $(NOVEL_BOX).animate({scrollTop: scrollTop}, 0);
    });
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
        if (isPageViewer()) {
            toastr.info("페이지 방식은 지원하지 않습니다.", "북마크");
        }

        bookmark();
        novel();
        viewer();
    }
} as Module;
