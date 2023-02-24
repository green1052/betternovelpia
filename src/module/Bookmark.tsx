import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {createRoot} from 'react-dom/client';
import styled, {createGlobalStyle, css} from "styled-components";
import {EP_List, HEADER_BAR, NOVEL_BOX, NOVEL_EP, NOVEL_TITLE} from "../util/Selectors";
import $ from "jquery";
import {isDarkMode} from "../util/IsDarkMode";
import {isPageViewer} from "../util/IsPageViewer";
import {appendSide} from "../util/AppendSide";
import {useLongPress} from "use-long-press";
import {novelLoaded} from "../util/NovelLoaded";
import {NovelContinueBox} from "../util/NovelContinueBox";

function sortBookmark(a: [string, Bookmark], b: [string, Bookmark]) {
    const aTitle = a[1].title;
    const bTitle = b[1].title;

    return aTitle < bTitle
        ? -1
        : aTitle > bTitle
            ? 1
            : 0;
}

function Bookmark() {
    const [bookmarks, setBookmarks] = useState((GM_getValue<Bookmarks>("bookmarks", {})));
    const [previousBookmark] = useState((GM_getValue<PreviousBookmark | undefined>("previousBookmark", undefined)));
    const [hide, setHide] = useState(true);
    const [inputHide, setInputHide] = useState(true);
    const [data, setData] = useState("");
    const [scrollTop, setScrollTop] = useState(0);

    const bookmarkList = useRef<HTMLOListElement>(null);

    useLayoutEffect(() => {
        if (scrollTop > 0)
            bookmarkList.current?.scroll(0, scrollTop);
    }, [scrollTop]);

    useEffect(() => appendSide("ion-bookmark", "북마크", () => setHide(false)), []);

    const deleteBookmark = useCallback((url: string) => {
        setScrollTop(bookmarkList.current?.scrollTop ?? 0);

        const bookmarks1 = {...bookmarks};
        delete bookmarks1[url];

        GM_setValue("bookmarks", bookmarks1);
        setBookmarks(bookmarks1);

        unsafeWindow.toastr.info("삭제되었습니다.", "북마크");
    }, [bookmarks]);

    const backup = useCallback(() => {
        if (!Object.keys(bookmarks).length) return;

        GM_setClipboard(JSON.stringify(bookmarks));

        unsafeWindow.toastr.info("클립보드로 복사되었습니다.", "북마크");
    }, [bookmarks]);

    const restore = useCallback(() => {
        setInputHide(true);
        setData("");

        if (!data) {
            unsafeWindow.toastr.info("데이터가 비어있습니다.", "북마크");
            return;
        }

        const json = JSON.parse(data);
        GM_setValue("bookmarks", json);
        setBookmarks(json);

        unsafeWindow.toastr.info("복원되었습니다.", "북마크");
    }, [data]);

    const clean = useCallback(() => {
        if (!Object.keys(bookmarks).length) return;

        setScrollTop(bookmarkList.current?.scrollTop ?? 0);

        const bookmarks1 = {...bookmarks};

        const sorted: {
            [key: string]: [string, Bookmark][]
        } = {};

        for (const [key, value] of Object.entries(bookmarks1).sort(sortBookmark)) {
            const title = value.title;

            sorted[title] ??= [];
            sorted[title].push([key, value]);
        }

        const result: Bookmarks = {};

        for (const [, value] of Object.entries(sorted)) {
            const [url, bookmark] = value[value.length - 1];
            result[url] = bookmark;
        }

        GM_setValue("bookmarks", result);
        setBookmarks(result);

        unsafeWindow.toastr.info("정리되었습니다.", "북마크");
    }, []);

    const reset = useCallback(() => setBookmarks({}), []);

    const quit = useCallback(() => setHide(true), []);

    const GlobalStyles = createGlobalStyle`
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
        margin-bottom: 10px;
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
                    <input autoFocus onChange={(e) => setData(e.target.value)}
                           value={data}
                           type="text"
                           placeholder="데이터를 입력해주세요"/>
                    <button onClick={restore} style={{marginLeft: "5px"}}>적용</button>
                    <button onClick={() => setInputHide(true)} style={{marginLeft: "5px"}}>취소</button>
                </div>
            }

            <h2 style={{marginTop: "5px", textAlign: "center"}}>북마크 관리</h2>

            <ol ref={bookmarkList} className="no-overflow bookmark"
                style={{
                    height: "85vh",
                    overflow: "auto",
                    fontSize: "15px",
                    marginLeft: "-10px"
                }}>
                {
                    (
                        GM_getValue<boolean>("Bookmark_Sort", false)
                            ? Object.entries(bookmarks).sort(sortBookmark)
                            : Object.entries(bookmarks)
                    ).map(([key, value]) =>
                        <li>
                            <div>
                                <a href={key}>{value.chapter} - {value.title}</a>
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
                <h5 className="no-overflow" style={{fontSize: ".83em", width: "20vh"}}>
                    이전 소설:
                    &nbsp;
                    <a href={previousBookmark?.url ?? "#"}>
                        {
                            previousBookmark?.title && previousBookmark?.chapter
                                ? `${previousBookmark?.chapter} - ${previousBookmark?.title}`
                                : "없음"
                        }
                    </a>
                </h5>
            </div>

            <div style={{
                position: "fixed",
                bottom: "5px",
                right: "5px"
            }}>
                <button onClick={clean}>정리</button>
                <button onDoubleClick={reset} style={{marginLeft: "5px"}}>초기화</button>
                <button onClick={quit} style={{marginLeft: "5px"}}>
                    닫기
                </button>
            </div>
        </MainDiv>
    );
}

function Novel() {
    useEffect(() => {
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

        observer.observe(document.querySelector(EP_List)!, {
            childList: true
        });
    }, []);

    const bookmarks = GM_getValue<Bookmarks>("bookmarks", {});

    const bookmark = Object.entries(bookmarks).filter(([, value]) => value.title === document.title.split("-")[2].trimStart()).pop();
    const previousBookmark = GM_getValue<PreviousBookmark | undefined>("previousBookmark", undefined);

    return (
        <>
            {
                bookmark
                    ? <NovelContinueBox url={bookmark[0]} chapter={bookmark[1].chapter} isBookmark={true}/>
                    : null
            }
            {
                previousBookmark && previousBookmark.title === document.title.split("-")[2].trimStart()
                    ? <NovelContinueBox url={previousBookmark.url} chapter={previousBookmark.chapter}/>
                    : null
            }
        </>
    );
}

function Viewer() {
    const [bookmarks, setBookmarks] = useState((GM_getValue<Bookmarks>("bookmarks", {})));
    const [previousBookmark, setPreviousBookmark] = useState((GM_getValue<PreviousBookmark | undefined>("previousBookmark", undefined)));

    const chapter = document.querySelector(NOVEL_EP)?.textContent!.trim() ?? "EP.알 수 없음";
    const title = document.querySelector(NOVEL_TITLE)?.textContent!.trim() ?? "알 수 없음";

    let scrollTop = -1;
    let askAlert = true;

    if (bookmarks.hasOwnProperty(location.href) || (!GM_getValue<boolean>("PreviousBookmark_First", false) && previousBookmark?.url === location.href)) {
        scrollTop = bookmarks[location.href].scrollTop;

        if (GM_getValue<boolean>("Bookmark_AutoUse", false))
            askAlert = false;

        if (GM_getValue<boolean>("Bookmark_OneUse", false)) {
            const bookmarks1 = {...bookmarks};
            delete bookmarks1[location.href];

            setBookmarks(bookmarks1);
            GM_setValue("bookmarks", bookmarks1);
        }
    } else if (previousBookmark !== undefined && previousBookmark.url === location.href) {
        scrollTop = previousBookmark.scrollTop;

        if (GM_getValue<boolean>("PreviousBookmark_AutoUse", false))
            askAlert = false;
    }

    if (scrollTop !== -1) {
        useLayoutEffect(() => {
            novelLoaded(() => {
                setTimeout(() => {
                    if (askAlert && !confirm("북마크로 이동하시겠습니까?")) return;

                    document.querySelector(NOVEL_BOX)?.scroll(0, scrollTop);
                }, 500);
            });
        }, [askAlert, scrollTop]);
    }

    if (GM_getValue<boolean>("PreviousBookmark", false)) {
        useLayoutEffect(() => {
            unsafeWindow.getPageMark = () => {
            };

            const url = location.href;
            let scrollTop = -1;

            $(NOVEL_BOX).on("scroll", (e) => scrollTop = e.currentTarget.scrollTop);

            window.addEventListener("beforeunload", () => {
                if (scrollTop <= -1)
                    return;

                const previousBookmark1 = {url, scrollTop, title, chapter};

                setPreviousBookmark(previousBookmark1);
                GM_setValue("previousBookmark", previousBookmark1);
            });
        }, [scrollTop, title, chapter]);
    }

    const click = useCallback(() => {
        if (location.hash !== "")
            return;

        const scrollTop = document.querySelector(NOVEL_BOX)?.scrollTop;

        if (scrollTop === undefined)
            return;

        const bookmark1 = {...bookmarks};

        bookmark1[location.href] = {scrollTop, title, chapter};

        GM_setValue("bookmarks", bookmark1);
        setBookmarks(bookmark1);

        unsafeWindow.toastr.info("저장되었습니다.", "북마크");
    }, [bookmarks]);

    const longClick = useLongPress(() => {
        if (location.hash !== "")
            return;

        const bookmark1 = {...bookmarks};

        if (!bookmark1.hasOwnProperty(location.href)) return;

        delete bookmark1[location.href];

        GM_setValue("bookmarks", bookmark1);
        setBookmarks(bookmark1);

        unsafeWindow.toastr.info("삭제되었습니다.", "북마크");
    });

    const BookmarkIcon = styled.i`
      color: ${bookmarks.hasOwnProperty(location.href)
              ? isDarkMode()
                      ? "rgb(117, 242, 70)"
                      : "rgb(160, 73, 180)"
              : isDarkMode()
                      ? "#ffffff7a"
                      : "#0000007a"};
    `;

    return <BookmarkIcon className="icon ion-bookmark" onClick={click} {...longClick}/>;
}

export default {
    config: {
        head: "북마크 설정",
        configs: {
            Bookmark: {
                label: "북마크 활성화",
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
            },
            Bookmark_Sort: {
                label: "북마크 올림차순 정렬",
                type: "checkbox",
                default: false
            },
            PreviousBookmark: {
                label: "이전 회차 북마크 활성화",
                type: "checkbox",
                default: false
            },
            PreviousBookmark_First: {
                label: "이전 회차 북마크 우선",
                type: "checkbox",
                default: false
            },
            PreviousBookmark_AutoUse: {
                label: "이전 회차 북마크 자동 이동",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        if (!GM_getValue<boolean>("Bookmark", false) && !GM_getValue<boolean>("PreviousBookmark", false)) return;

        if (isPageViewer()) {
            unsafeWindow.toastr.info("페이지 방식은 지원하지 않습니다.", "북마크");
            return;
        }

        if (/^\/novel\//.test(location.pathname)) {
            const tr = document.querySelector("tbody:has(.more_info) > tr:last-of-type > td");

            if (!tr) return;

            const appContainer = document.createElement("div");
            tr.appendChild(appContainer);

            const root = createRoot(appContainer);
            root.render(<Novel/>);
        }

        if (/^\/viewer\//.test(location.pathname)) {
            const appContainer = document.createElement("div");
            appContainer.style.width = "20px";
            appContainer.style.height = "20px";

            $(`${HEADER_BAR} .menu-top-right`).children().eq(2).before(appContainer);

            const root = createRoot(appContainer);
            root.render(<Viewer/>);
        }

        if (!/^\/viewer\//.test(location.pathname)) {
            const appContainer = document.createElement("div");
            document.body.prepend(appContainer);

            const root = createRoot(appContainer);
            root.render(<Bookmark/>);
        }
    }
} as Module;
