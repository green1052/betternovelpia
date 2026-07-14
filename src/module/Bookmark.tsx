import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {EP_LIST, HEADER_BAR, NOVEL_BOX, NOVEL_EP} from "../util/Selectors";
import {isPageViewer} from "../util/IsPageViewer";
import {appendSide} from "../util/AppendSide";
import {useLongPress} from "use-long-press";
import {novelLoaded} from "../util/NovelLoaded";
import {NovelContinueBox} from "../util/NovelContinueBox";
import {injectCSS, ThemedApp} from "../util/ui";
import {defineModule, type Settings} from "../util/config";
import bookmarkCSS from "../styles/bookmark.css" with {type: "text"};

const bookmarkConfig = {
    Bookmark: {label: "북마크 활성화", type: "checkbox", default: false},
    Bookmark_OneUse: {label: "북마크 한번만 사용", type: "checkbox", default: false},
    Bookmark_AutoUse: {label: "북마크 자동 이동", type: "checkbox", default: false},
    Bookmark_Sort: {label: "북마크 올림차순 정렬", type: "checkbox", default: false},
    PreviousBookmark: {label: "이전 회차 북마크 활성화", type: "checkbox", default: false},
    PreviousBookmark_First: {label: "이전 회차 북마크 우선", type: "checkbox", default: false},
    PreviousBookmark_AutoUse: {label: "이전 회차 북마크 자동 이동", type: "checkbox", default: false}
} as const satisfies Record<string, ConfigType>;

type BookmarkSettings = Settings<typeof bookmarkConfig>;

function sortBookmark(a: [string, Bookmark], b: [string, Bookmark]) {
    return a[1].title < b[1].title ? -1 : a[1].title > b[1].title ? 1 : 0;
}

function BookmarkList_({settings}: {settings: BookmarkSettings}) {
    const [bookmarks, setBookmarks] = useState<Record<string, Bookmark>>(GM_getValue("bookmarks", {}));
    const [previousBookmark] = useState<Bookmark | undefined>(GM_getValue("previousBookmark", undefined));
    const [hide, setHide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState("");
    const [scrollTop, setScrollTop] = useState(0);

    const bookmarkList = useRef<HTMLUListElement | null>(null);

    useLayoutEffect(() => {
        if (scrollTop > 0 && bookmarkList.current)
            bookmarkList.current.scroll(0, scrollTop);
    }, [scrollTop]);

    useEffect(() => appendSide("북마크", () => setHide(false)), []);

    const deleteBookmark = useCallback((url: string) => {
        if (bookmarkList.current)
            setScrollTop(bookmarkList.current.scrollTop ?? 0);

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
        if (!data) {
            unsafeWindow.toastr.info("데이터가 비어있습니다.", "북마크");
            setShowModal(false);
            return;
        }

        try {
            const json = JSON.parse(data);
            GM_setValue("bookmarks", json);
            setBookmarks(json);
            unsafeWindow.toastr.info("복원되었습니다.", "북마크");
        } catch (e) {
            unsafeWindow.toastr.info("잘못된 데이터 형식입니다.", "북마크");
        }

        setShowModal(false);
        setData("");
    }, [data]);

    const clean = useCallback(() => {
        if (!Object.keys(bookmarks).length) return;

        if (bookmarkList.current)
            setScrollTop(bookmarkList.current.scrollTop ?? 0);

        const bookmarks1 = {...bookmarks};

        const sorted: Record<string, [string, Bookmark][]> = {};

        for (const [key, value] of Object.entries(bookmarks1).sort(sortBookmark)) {
            const title = value.title;

            sorted[title] ??= [];
            sorted[title].push([key, value]);
        }

        const result: Record<string, Bookmark> = {};

        for (const [, value] of Object.entries(sorted)) {
            const last = value[value.length - 1];
            if (last) {
                const [url, bookmark] = last;
                result[url] = bookmark;
            }
        }

        GM_setValue("bookmarks", result);
        setBookmarks(result);

        unsafeWindow.toastr.info("정리되었습니다.", "북마크");
    }, [bookmarks]);

    const reset = useCallback(() => {
        if (confirm("정말로 모든 북마크를 삭제하시겠습니까?")) {
            GM_setValue("bookmarks", {});
            setBookmarks({});
            unsafeWindow.toastr.info("모든 북마크가 삭제되었습니다.", "북마크");
        }
    }, []);

    const quit = useCallback(() => setHide(true), []);

    const bookmarkCount = Object.entries(bookmarks).length;

    return (
        <ThemedApp>
            <div className={`bn-app ${hide ? "bn-app--hidden" : ""}`} style={{zIndex: 99999}}>
                {showModal && (
                    <div className="bn-modal bn-modal--center">
                        <div className="bn-modal-content bn-modal-content--center">
                            <h3 className="bn-modal-title">북마크 복원</h3>
                            <textarea
                                className="bn-modal-input"
                                placeholder="백업된 북마크 데이터를 붙여넣으세요"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                autoFocus
                            />
                            <div className="bn-modal-actions">
                                <button
                                    className="bn-btn bn-btn--outline"
                                    onClick={() => {
                                        setShowModal(false);
                                        setData("");
                                    }}
                                >
                                    취소
                                </button>
                                <button className="bn-btn bn-btn--primary" onClick={restore}>
                                    복원
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bn-app-bar">
                    <h1 className="bn-app-title">
                        <i className="icon ion-bookmark" style={{marginRight: 8, color: "#007AFF"}}/>
                        북마크
                    </h1>
                    <button className="bn-close-btn" onClick={quit}>
                        <i className="icon ion-close-round"/>
                    </button>
                </div>

                <div className="bn-content-area" style={{padding: 0}}>
                    <div className="bn-bookmark-card">
                        <div className="bn-bookmark-header">
                            <h2 className="bn-bookmark-title">
                                북마크 목록
                                {bookmarkCount > 0 && <span className="bn-bookmark-count">({bookmarkCount})</span>}
                            </h2>
                        </div>

                        {bookmarkCount === 0 ? (
                            <div className="bn-empty-state">
                                <i className="bn-empty-icon icon ion-bookmark"/>
                                <p className="bn-empty-text">저장된 북마크가 없습니다</p>
                            </div>
                        ) : (
                            <ul className="bn-bookmark-list" ref={bookmarkList}>
                                {(settings.Bookmark_Sort
                                        ? Object.entries(bookmarks).sort(sortBookmark)
                                        : Object.entries(bookmarks)
                                ).map(([key, value]) => (
                                    <li className="bn-bookmark-item" key={key}>
                                        <div className="bn-bookmark-item-content">
                                            <div className="bn-bookmark-chapter">{value.chapter}</div>
                                            <a className="bn-bookmark-link" href={key}>
                                                {value.title}
                                            </a>
                                            <div className="bn-bookmark-actions">
                                                <button className="bn-delete-btn" onClick={() => deleteBookmark(key)}>
                                                    <i className="icon ion-ios-trash-outline" style={{marginRight: 6}}/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="bn-bottom-bar">
                    <button className="bn-btn bn-btn--secondary bn-btn--flex" onClick={backup}>
                        <i className="bn-btn-icon icon ion-ios-cloud-upload"/>
                        백업
                    </button>
                    <button className="bn-btn bn-btn--secondary bn-btn--flex" onClick={() => setShowModal(true)}>
                        <i className="bn-btn-icon icon ion-ios-cloud-download"/>
                        복원
                    </button>
                    <button className="bn-btn bn-btn--secondary bn-btn--flex" onClick={clean}>
                        <i className="bn-btn-icon icon ion-ios-compose"/>
                        정리
                    </button>
                    <button className="bn-btn bn-btn--danger bn-btn--flex" onClick={reset}>
                        <i className="bn-btn-icon icon ion-ios-trash"/>
                        초기화
                    </button>
                </div>

                {previousBookmark && (
                    <div className="bn-prev-bookmark-toast">
                        <div className="bn-prev-bookmark-content">
                            <i className="bn-prev-bookmark-icon icon ion-ios-arrow-back"/>
                            <div className="bn-prev-bookmark-info">
                                <div className="bn-prev-bookmark-label">이전 소설</div>
                                <a className="bn-prev-bookmark-link" href={previousBookmark?.url ?? "#"}>
                                    {previousBookmark?.title && previousBookmark?.chapter
                                        ? `${previousBookmark?.chapter} - ${previousBookmark?.title}`
                                        : "없음"
                                    }
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ThemedApp>
    );
}

function Novel() {
    useEffect(() => {
        function addBookmark() {
            for (const element of document.querySelectorAll(`${EP_LIST} > table > tbody > tr td:nth-child(2)`)) {
                const url = /'\/viewer\/(\d*)'/.exec(element.getAttribute("onclick") ?? "")?.[1];

                if (!url) continue;

                if (!Object.keys(bookmarks).find(key => key.endsWith(url))) continue;

                const bookmarkIcon = element.querySelector<HTMLElement>("b > .ion-bookmark");
                if (bookmarkIcon) bookmarkIcon.style.display = "";
            }
        }

        addBookmark();

        const observer = new MutationObserver(addBookmark);

        const epList = document.querySelector(EP_LIST);
        if (epList) observer.observe(epList, {childList: true});
    }, []);

    const bookmarks = GM_getValue<Record<string, Bookmark>>("bookmarks", {});

    const novelTitle = (document.title.split("-")[2] ?? "").trimStart();
    const bookmark = Object.entries(bookmarks).findLast(([, value]) => value.title === novelTitle);
    const previousBookmark = GM_getValue<Bookmark | undefined>("previousBookmark", undefined);

    return (
        <>
            {
                bookmark
                    ? <NovelContinueBox url={bookmark[0]} chapter={bookmark[1].chapter} isBookmark={true}/>
                    : null
            }
            {
                previousBookmark && previousBookmark.title === novelTitle
                    ? <NovelContinueBox url={previousBookmark.url ?? ""} chapter={previousBookmark.chapter}/>
                    : null
            }
        </>
    );
}

function Viewer({settings}: {settings: BookmarkSettings}) {
    const [bookmarks, setBookmarks] = useState<Record<string, Bookmark>>(GM_getValue("bookmarks", {}));
    const [previousBookmark, setPreviousBookmark] = useState<Bookmark | undefined>(GM_getValue("previousBookmark", undefined));

    const chapter = document.querySelector(NOVEL_EP)?.textContent?.trim() ?? "EP.알 수 없음";
    const title = (document.title.split("-")[2] ?? "알 수 없음").trimStart();

    let scrollTop = -1;
    let askAlert = true;

    if (bookmarks.hasOwnProperty(location.href) && (!settings.PreviousBookmark_First && previousBookmark?.url !== location.href)) {
        scrollTop = bookmarks[location.href]?.scrollTop ?? -1;

        if (settings.Bookmark_AutoUse)
            askAlert = false;

        if (settings.Bookmark_OneUse) {
            const bookmarks1 = {...bookmarks};
            delete bookmarks1[location.href];

            setBookmarks(bookmarks1);
            GM_setValue("bookmarks", bookmarks1);
        }
    } else if (previousBookmark?.url === location.href) {
        scrollTop = previousBookmark.scrollTop;

        if (settings.PreviousBookmark_AutoUse)
            askAlert = false;
    }

    useLayoutEffect(() => {
        const noop = () => {
        };

        unsafeWindow.bookmark = noop;
        unsafeWindow.getPageMark = noop;
        unsafeWindow.makePageMark = noop;
        unsafeWindow.updateMark = noop;
        unsafeWindow.updateMarkEpis = noop;
        unsafeWindow.check_start_position = noop;

        if (scrollTop !== -1) {
            novelLoaded(() => {
                setTimeout(() => {
                    const a = !confirm("북마크로 이동하시겠습니까?");

                    if (askAlert && a) return;

                    document.querySelector(NOVEL_BOX)?.scroll(0, scrollTop);
                }, 500);
            });
        }

        if (settings.PreviousBookmark) {
            const url = location.href;

            window.addEventListener("beforeunload", () => {
                scrollTop = document.querySelector(NOVEL_BOX)?.scrollTop ?? -1;

                if (scrollTop === -1)
                    return;

                const previousBookmark1 = {url, scrollTop, title, chapter};

                setPreviousBookmark(previousBookmark1);
                GM_setValue("previousBookmark", previousBookmark1);
            });
        }
    }, []);

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

    const isActive = bookmarks.hasOwnProperty(location.href);

    return (
        <i
            className="bn-viewer-bookmark-icon icon ion-bookmark"
            data-active={isActive ? "true" : undefined}
            onClick={click}
            {...longClick}
        />
    );
}

export default defineModule({
    config: {head: "북마크 설정", configs: bookmarkConfig},
    start(settings) {
        if (!settings.Bookmark && !settings.PreviousBookmark) return;

        if (isPageViewer()) {
            unsafeWindow.toastr.info("페이지 방식은 지원하지 않습니다.", "북마크");
            return;
        }

        injectCSS(bookmarkCSS);

        if (/^\/novel\//.test(location.pathname)) {
            const tr = document.querySelector("div:not(.mobile_hidden) > .info-graybox");

            if (!tr) return;

            const appContainer = document.createElement("div");
            tr.after(appContainer);

            const root = createRoot(appContainer);
            root.render(<Novel/>);
        }

        if (/^\/viewer\//.test(location.pathname)) {
            const appContainer = document.createElement("div");
            appContainer.style.width = "20px";
            appContainer.style.height = "20px";

            const menuTopRight = document.querySelector(`${HEADER_BAR} .menu-top-right`);
            if (menuTopRight && menuTopRight.children[2]) {
                menuTopRight.children[2].before(appContainer);
            }

            const root = createRoot(appContainer);
            root.render(<Viewer settings={settings}/>);
        }

        if (!/^\/viewer\//.test(location.pathname)) {
            const appContainer = document.createElement("div");
            document.body.prepend(appContainer);

            const root = createRoot(appContainer);
            root.render(<BookmarkList_ settings={settings}/>);
        }
    }
});
