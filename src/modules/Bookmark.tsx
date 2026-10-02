import {GM_getValue, GM_setClipboard, GM_setValue, unsafeWindow} from "$";
import {useEffect, useLayoutEffect, useRef, useState} from "preact/compat";
import {createRoot} from "preact/compat/client";
import {EP_LIST, HEADER_BAR, NOVEL_BOX, NOVEL_EP, novelLoaded} from "../core/site";
import {appendSide} from "../core/dom";
import {useLongPress} from "use-long-press";
import {NovelContinueBox} from "../components/NovelContinueBox";
import {RestoreModal, ThemedApp} from "../components/ui";
import {type ConfigFields, defineModule, type Settings} from "../core/module";
import "../styles/bookmark.css";

const bookmarkConfig = {
    Bookmark: {label: "북마크 활성화", type: "checkbox", default: false},
    Bookmark_OneUse: {label: "북마크 한번만 사용", type: "checkbox", default: false},
    Bookmark_AutoUse: {label: "북마크 자동 이동", type: "checkbox", default: false},
    Bookmark_Sort: {label: "북마크 올림차순 정렬", type: "checkbox", default: false},
    PreviousBookmark: {label: "이전 회차 북마크 활성화", type: "checkbox", default: false},
    PreviousBookmark_First: {label: "이전 회차 북마크 우선", type: "checkbox", default: false},
    PreviousBookmark_AutoUse: {label: "이전 회차 북마크 자동 이동", type: "checkbox", default: false}
} as const satisfies ConfigFields;

type BookmarkSettings = Settings<typeof bookmarkConfig>;
interface Bookmark {
    scrollTop: number;
    title: string;
    chapter: string;
    url?: string;
}

type Bookmarks = Record<string, Bookmark>;

const toast = (message: string) => unsafeWindow.toastr.info(message, "북마크");

function sortBookmark(a: [string, Bookmark], b: [string, Bookmark]) {
    return a[1].title < b[1].title ? -1 : a[1].title > b[1].title ? 1 : 0;
}

function omit(bookmarks: Bookmarks, url: string): Bookmarks {
    const {[url]: _, ...rest} = bookmarks;
    return rest;
}

function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmarks>(GM_getValue("bookmarks", {}));

    const save = (next: Bookmarks) => {
        GM_setValue("bookmarks", next);
        setBookmarks(next);
    };

    return [bookmarks, save] as const;
}

function BookmarkList({settings}: { settings: BookmarkSettings }) {
    const [bookmarks, save] = useBookmarks();
    const [previousBookmark] = useState<Bookmark | undefined>(GM_getValue("previousBookmark", undefined));
    const [hide, setHide] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);

    const bookmarkList = useRef<HTMLUListElement | null>(null);

    useLayoutEffect(() => {
        if (scrollTop > 0 && bookmarkList.current)
            bookmarkList.current.scroll(0, scrollTop);
    }, [scrollTop]);

    useEffect(() => appendSide("북마크", () => setHide(false)), []);

    const keepScroll = () => {
        if (bookmarkList.current)
            setScrollTop(bookmarkList.current.scrollTop);
    };

    const deleteBookmark = (url: string) => {
        keepScroll();
        save(omit(bookmarks, url));
        toast("삭제되었습니다.");
    };

    const backup = () => {
        if (!Object.keys(bookmarks).length) return;

        GM_setClipboard(JSON.stringify(bookmarks), "text");
        toast("클립보드로 복사되었습니다.");
    };

    const restore = (data: string) => {
        setShowModal(false);

        if (!data) {
            toast("데이터가 비어있습니다.");
            return;
        }

        try {
            save(JSON.parse(data));
            toast("복원되었습니다.");
        } catch {
            toast("잘못된 데이터 형식입니다.");
        }
    };

    // 같은 소설은 정렬 순서상 마지막 북마크만 남긴다
    const clean = () => {
        if (!Object.keys(bookmarks).length) return;

        keepScroll();

        const latest = new Map(Object.entries(bookmarks).sort(sortBookmark).map(entry => [entry[1].title, entry]));
        save(Object.fromEntries(latest.values()));

        toast("정리되었습니다.");
    };

    const reset = () => {
        if (confirm("정말로 모든 북마크를 삭제하시겠습니까?")) {
            save({});
            toast("모든 북마크가 삭제되었습니다.");
        }
    };

    const entries = settings.Bookmark_Sort ? Object.entries(bookmarks).sort(sortBookmark) : Object.entries(bookmarks);

    return (
        <ThemedApp>
            <div className={`bn-app ${hide ? "bn-app--hidden" : ""}`} style={{zIndex: 99999}}>
                {showModal && (
                    <RestoreModal
                        title="북마크 복원"
                        placeholder="백업된 북마크 데이터를 붙여넣으세요"
                        position="center"
                        onClose={() => setShowModal(false)}
                        onRestore={restore}
                    />
                )}

                <div className="bn-app-bar">
                    <h1 className="bn-app-title">
                        <i className="icon ion-bookmark" style={{marginRight: 8, color: "#007AFF"}}/>
                        북마크
                    </h1>
                    <button className="bn-close-btn" onClick={() => setHide(true)}>
                        <i className="icon ion-close-round"/>
                    </button>
                </div>

                <div className="bn-content-area" style={{padding: 0}}>
                    <div className="bn-bookmark-card">
                        <div className="bn-bookmark-header">
                            <h2 className="bn-bookmark-title">
                                북마크 목록
                                {entries.length > 0 && <span className="bn-bookmark-count">({entries.length})</span>}
                            </h2>
                        </div>

                        {entries.length === 0 ? (
                            <div className="bn-empty-state">
                                <i className="bn-empty-icon icon ion-bookmark"/>
                                <p className="bn-empty-text">저장된 북마크가 없습니다</p>
                            </div>
                        ) : (
                            <ul className="bn-bookmark-list" ref={bookmarkList}>
                                {entries.map(([key, value]) => (
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
                                <a className="bn-prev-bookmark-link" href={previousBookmark.url ?? "#"}>
                                    {previousBookmark.title && previousBookmark.chapter
                                        ? `${previousBookmark.chapter} - ${previousBookmark.title}`
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
    const bookmarks = GM_getValue<Bookmarks>("bookmarks", {});

    useEffect(() => {
        function addBookmark() {
            for (const element of document.querySelectorAll(`${EP_LIST} > table > tbody > tr td:nth-child(2)`)) {
                const url = /'\/viewer\/(\d*)'/.exec(element.getAttribute("onclick") ?? "")?.[1];

                if (!url || !Object.keys(bookmarks).some(key => key.endsWith(url))) continue;

                const bookmarkIcon = element.querySelector<HTMLElement>("b > .ion-bookmark");
                if (bookmarkIcon) bookmarkIcon.style.display = "";
            }
        }

        addBookmark();

        const epList = document.querySelector(EP_LIST);
        if (epList) new MutationObserver(addBookmark).observe(epList, {childList: true});
    }, []);

    const novelTitle = (document.title.split("-")[2] ?? "").trimStart();
    const bookmark = Object.entries(bookmarks).findLast(([, value]) => value.title === novelTitle);
    const previousBookmark = GM_getValue<Bookmark | undefined>("previousBookmark", undefined);

    return (
        <>
            {bookmark && <NovelContinueBox url={bookmark[0]} chapter={bookmark[1].chapter} isBookmark={true}/>}
            {previousBookmark?.title === novelTitle && <NovelContinueBox url={previousBookmark.url ?? ""} chapter={previousBookmark.chapter}/>}
        </>
    );
}

function Viewer({settings}: { settings: BookmarkSettings }) {
    const [bookmarks, save] = useBookmarks();
    const [previousBookmark] = useState<Bookmark | undefined>(GM_getValue("previousBookmark", undefined));

    const url = location.href;
    const chapter = document.querySelector(NOVEL_EP)?.textContent?.trim() ?? "EP.알 수 없음";
    const title = (document.title.split("-")[2] ?? "알 수 없음").trimStart();

    let scrollTop = -1;
    let askAlert = true;

    if (Object.hasOwn(bookmarks, url) && !settings.PreviousBookmark_First && previousBookmark?.url !== url) {
        scrollTop = bookmarks[url]?.scrollTop ?? -1;

        if (settings.Bookmark_AutoUse)
            askAlert = false;

        if (settings.Bookmark_OneUse)
            save(omit(bookmarks, url));
    } else if (previousBookmark?.url === url) {
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
                    if (askAlert && !confirm("북마크로 이동하시겠습니까?")) return;

                    document.querySelector(NOVEL_BOX)?.scroll(0, scrollTop);
                }, 500);
            });
        }

        if (settings.PreviousBookmark) {
            window.addEventListener("beforeunload", () => {
                const scrollTop = document.querySelector(NOVEL_BOX)?.scrollTop;
                if (scrollTop === undefined) return;

                GM_setValue("previousBookmark", {url, scrollTop, title, chapter});
            });
        }
    }, []);

    const click = () => {
        if (location.hash !== "") return;

        const scrollTop = document.querySelector(NOVEL_BOX)?.scrollTop;
        if (scrollTop === undefined) return;

        save({...bookmarks, [url]: {scrollTop, title, chapter}});
        toast("저장되었습니다.");
    };

    const longClick = useLongPress(() => {
        if (location.hash !== "" || !Object.hasOwn(bookmarks, url)) return;

        save(omit(bookmarks, url));
        toast("삭제되었습니다.");
    });

    return (
        <i
            className="bn-viewer-bookmark-icon icon ion-bookmark"
            data-active={Object.hasOwn(bookmarks, url) ? "true" : undefined}
            onClick={click}
            {...longClick}
        />
    );
}

export default defineModule({
    config: {head: "북마크 설정", configs: bookmarkConfig},
    start(settings) {
        if (!settings.Bookmark && !settings.PreviousBookmark) return;

        if (localStorage.getItem("viewer_paging") === "1") {
            toast("페이지 방식은 지원하지 않습니다.");
            return;
        }

        if (/^\/novel\//.test(location.pathname)) {
            const infoBox = document.querySelector("div:not(.mobile_hidden) > .info-graybox");
            if (!infoBox) return;

            const container = document.createElement("div");
            infoBox.after(container);
            createRoot(container).render(<Novel/>);
        }

        if (/^\/viewer\//.test(location.pathname)) {
            const container = document.createElement("div");
            container.style.width = "20px";
            container.style.height = "20px";

            document.querySelector(`${HEADER_BAR} .menu-top-right`)?.children[2]?.before(container);

            createRoot(container).render(<Viewer settings={settings}/>);
        } else {
            const container = document.createElement("div");
            document.body.prepend(container);

            createRoot(container).render(<BookmarkList settings={settings}/>);
        }
    }
});
