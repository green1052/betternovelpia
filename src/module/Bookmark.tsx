import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import styled, {createGlobalStyle, keyframes} from "styled-components";
import {EP_List, HEADER_BAR, NOVEL_BOX, NOVEL_EP} from "../util/Selectors";
import $ from "cash-dom";
import {isDarkMode} from "../util/IsDarkMode";
import {isPageViewer} from "../util/IsPageViewer";
import {appendSide} from "../util/AppendSide";
import {useLongPress} from "use-long-press";
import {novelLoaded} from "../util/NovelLoaded";
import {NovelContinueBox} from "../util/NovelContinueBox";

interface Bookmark {
    scrollTop: number;
    title: string;
    chapter: string;
    url?: string;
}

interface StyledProps {
    hide?: boolean;
    active?: boolean;
    variant?: "danger" | "primary" | "secondary" | "outline";
}

function sortBookmark(a: [string, Bookmark], b: [string, Bookmark]) {
    const aTitle = a[1].title;
    const bTitle = b[1].title;

    return aTitle < bTitle
        ? -1
        : aTitle > bTitle
            ? 1
            : 0;
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
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

    .bookmark-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

const MainDiv = styled.div<StyledProps>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background-color: ${() => isDarkMode() ? "#121212" : "#f0f0f0"};
    color: ${() => isDarkMode() ? "#ffffff" : "#121212"};
    display: ${props => props.hide ? "none" : "flex"};
    flex-direction: column;
    animation: ${fadeIn} 0.3s ease;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const AppBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: ${() => isDarkMode() ? "#1e1e1e" : "#ffffff"};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 5;
`;

const AppTitle = styled.h1`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
`;

const BookmarkIcon = styled.i`
    margin-right: 8px;
    color: ${() => isDarkMode() ? "#007AFF" : "#007AFF"};
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    font-size: 24px;
    cursor: pointer;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: -8px;

    &:active {
        background-color: ${() => isDarkMode() ? "#333333" : "#eeeeee"};
    }
`;

const ContentArea = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
`;

const BookmarkCard = styled.div`
    background-color: ${() => isDarkMode() ? "#2a2a2a" : "#ffffff"};
    margin: 12px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: ${slideUp} 0.3s ease;
`;

const BookmarkHeader = styled.div`
    background-color: ${() => isDarkMode() ? "#333333" : "#f8f8f8"};
    padding: 12px 16px;
    border-bottom: 1px solid ${() => isDarkMode() ? "#444444" : "#eeeeee"};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BookmarkTitle = styled.h2`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    display: flex;
    align-items: center;
`;

const BookmarkCount = styled.span`
    font-size: 14px;
    font-weight: normal;
    color: ${() => isDarkMode() ? "#bbbbbb" : "#666666"};
    margin-left: 8px;
`;

const BookmarkList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const BookmarkItem = styled.li<StyledProps>`
    padding: 16px;
    border-bottom: 1px solid ${() => isDarkMode() ? "#444444" : "#eeeeee"};
    position: relative;

    &:last-child {
        border-bottom: none;
    }

    &:active {
        background-color: ${() => isDarkMode() ? "#333333" : "#f8f8f8"};
    }
`;

const BookmarkItemContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const BookmarkChapter = styled.div`
    font-size: 14px;
    color: ${() => isDarkMode() ? "#007AFF" : "#007AFF"};
    margin-bottom: 4px;
    font-weight: 500;
`;

const BookmarkLink = styled.a`
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;

    &:active {
        color: ${() => isDarkMode() ? "#007AFF" : "#007AFF"};
    }
`;

const BookmarkActions = styled.div`
    display: flex;
    margin-top: 8px;
    justify-content: flex-end;
`;

const DeleteButton = styled.button`
    background-color: ${() => isDarkMode() ? "#333333" : "#f2f2f2"};
    border: none;
    color: ${() => isDarkMode() ? "#FF3B30" : "#FF3B30"};
    cursor: pointer;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
        opacity: 0.8;
    }
`;

const DeleteButtonIcon = styled.i`
    margin-right: 6px;
`;

const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
`;

const EmptyIcon = styled.i`
    font-size: 48px;
    color: ${() => isDarkMode() ? "#555555" : "#cccccc"};
    margin-bottom: 16px;
`;

const EmptyText = styled.p`
    font-size: 16px;
    color: ${() => isDarkMode() ? "#bbbbbb" : "#999999"};
    margin: 0 0 8px 0;
`;

const ActionBar = styled.div`
    display: flex;
    padding: 12px;
    background-color: ${() => isDarkMode() ? "#1e1e1e" : "#ffffff"};
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 5;
`;

const ActionButton = styled.button<StyledProps>`
    background-color: ${props => {
        if (props.variant === "primary") return "#007AFF";
        if (props.variant === "danger") return "#FF3B30";
        if (props.variant === "outline") return "transparent";
        return isDarkMode() ? "#333333" : "#f2f2f2";
    }};
    color: ${props => {
        if (props.variant === "primary" || props.variant === "danger") return "#ffffff";
        if (props.variant === "outline") return isDarkMode() ? "#007AFF" : "#007AFF";
        return isDarkMode() ? "#ffffff" : "#333333";
    }};
    border: ${props => props.variant === "outline" ?
            `1px solid ${isDarkMode() ? "#007AFF" : "#007AFF"}` : "none"};
    border-radius: 8px;
    padding: 12px 0;
    font-size: 15px;    
    font-weight: 500;
    flex: 1;
    margin: 0 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
        opacity: 0.8;
    }
`;

const ActionButtonIcon = styled.i`
    margin-right: 6px;
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: ${fadeIn} 0.3s ease;
    padding: 20px;
`;

const ModalContent = styled.div`
    background-color: ${() => isDarkMode() ? "#2a2a2a" : "#ffffff"};
    width: 100%;
    max-width: 320px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: ${slideUp} 0.3s ease;
`;

const ModalHeader = styled.div`
    padding: 16px;
    border-bottom: 1px solid ${() => isDarkMode() ? "#444444" : "#eeeeee"};
`;

const ModalTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
`;

const ModalBody = styled.div`
    padding: 16px;
`;

const ModalInput = styled.textarea`
    width: 100%;
    height: 120px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid ${() => isDarkMode() ? "#444444" : "#dddddd"};
    background-color: ${() => isDarkMode() ? "#333333" : "#f8f8f8"};
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    font-size: 14px;
    resize: none;
    box-sizing: border-box;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: ${() => isDarkMode() ? "#007AFF" : "#007AFF"};
    }
`;

const ModalFooter = styled.div`
    display: flex;
    padding: 12px 16px;
    border-top: 1px solid ${() => isDarkMode() ? "#444444" : "#eeeeee"};
`;

const ModalButton = styled.button<StyledProps>`
    background-color: ${props => {
        if (props.variant === "primary") return "#007AFF";
        if (props.variant === "danger") return "#FF3B30";
        if (props.variant === "outline") return "transparent";
        return isDarkMode() ? "#333333" : "#f2f2f2";
    }};
    color: ${props => {
        if (props.variant === "primary" || props.variant === "danger") return "#ffffff";
        if (props.variant === "outline") return isDarkMode() ? "#007AFF" : "#007AFF";
        return isDarkMode() ? "#ffffff" : "#333333";
    }};
    border: ${props => props.variant === "outline" ?
            `1px solid ${isDarkMode() ? "#007AFF" : "#007AFF"}` : "none"};
    border-radius: 8px;
    padding: 12px 0;
    font-size: 15px;
    font-weight: 500;
    flex: 1;
    margin: 0 4px;
    cursor: pointer;

    &:active {
        opacity: 0.8;
    }
`;

const PreviousBookmarkToast = styled.div`
    position: fixed;
    bottom: 76px;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${() => isDarkMode() ? "#2a2a2a" : "#ffffff"};
    padding: 12px 16px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    width: calc(100% - 24px);
    max-width: 320px;
    z-index: 100;
    animation: ${slideUp} 0.3s ease;
    border: 1px solid ${() => isDarkMode() ? "#444444" : "#eeeeee"};
`;

const PreviousBookmarkContent = styled.div`
    display: flex;
    align-items: center;
`;

const PreviousBookmarkIcon = styled.i`
    color: ${() => isDarkMode() ? "#007AFF" : "#007AFF"};
    font-size: 18px;
    margin-right: 12px;
`;

const PreviousBookmarkInfo = styled.div`
    flex: 1;
    overflow: hidden;
`;

const PreviousBookmarkLabel = styled.div`
    font-size: 12px;
    color: ${() => isDarkMode() ? "#bbbbbb" : "#999999"};
    margin-bottom: 4px;
`;

const PreviousBookmarkLink = styled.a`
    color: ${() => isDarkMode() ? "#ffffff" : "#333333"};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;

    &:active {
        color: ${() => isDarkMode() ? "#007AFF" : "#007AFF"};
    }
`;

const ViewerBookmarkIcon = styled.i<StyledProps>`
    color: ${props => props.active
            ? "#007AFF"
            : isDarkMode() ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:active {
        transform: scale(0.9);
    }
`;

function Bookmark() {
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
            const [url, bookmark] = value[value.length - 1];
            result[url] = bookmark;
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
        <MainDiv hide={hide} className="bookmark-container">
            <GlobalStyles/>

            {showModal && (
                <Modal>
                    <ModalContent>
                        <ModalHeader>
                            <ModalTitle>북마크 복원</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <ModalInput
                                placeholder="백업된 북마크 데이터를 붙여넣으세요"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                                autoFocus
                            />
                        </ModalBody>
                        <ModalFooter>
                            <ModalButton
                                variant="outline"
                                onClick={() => {
                                    setShowModal(false);
                                    setData("");
                                }}
                            >
                                취소
                            </ModalButton>
                            <ModalButton variant="primary" onClick={restore}>
                                복원
                            </ModalButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            <AppBar>
                <AppTitle>
                    <BookmarkIcon className="icon ion-bookmark"/>
                    북마크
                </AppTitle>
                <CloseButton onClick={quit}>
                    <i className="icon ion-close-round"/>
                </CloseButton>
            </AppBar>

            <ContentArea>
                <BookmarkCard>
                    <BookmarkHeader>
                        <BookmarkTitle>
                            북마크 목록
                            {bookmarkCount > 0 && <BookmarkCount>({bookmarkCount})</BookmarkCount>}
                        </BookmarkTitle>
                    </BookmarkHeader>

                    {bookmarkCount === 0 ? (
                        <EmptyState>
                            <EmptyIcon className="icon ion-bookmark"/>
                            <EmptyText>저장된 북마크가 없습니다</EmptyText>
                        </EmptyState>
                    ) : (
                        <BookmarkList ref={bookmarkList}>
                            {(GM_getValue("Bookmark_Sort", false)
                                    ? Object.entries(bookmarks).sort(sortBookmark)
                                    : Object.entries(bookmarks)
                            ).map(([key, value]) => (
                                <BookmarkItem key={key}>
                                    <BookmarkItemContent>
                                        <BookmarkChapter>{value.chapter}</BookmarkChapter>
                                        <BookmarkLink href={key}>
                                            {value.title}
                                        </BookmarkLink>
                                        <BookmarkActions>
                                            <DeleteButton onClick={() => deleteBookmark(key)}>
                                                <DeleteButtonIcon className="icon ion-ios-trash-outline"/>
                                            </DeleteButton>
                                        </BookmarkActions>
                                    </BookmarkItemContent>
                                </BookmarkItem>
                            ))}
                        </BookmarkList>
                    )}
                </BookmarkCard>
            </ContentArea>

            <ActionBar>
                <ActionButton variant="secondary" onClick={backup}>
                    <ActionButtonIcon className="icon ion-ios-cloud-upload"/>
                    백업
                </ActionButton>
                <ActionButton variant="secondary" onClick={() => setShowModal(true)}>
                    <ActionButtonIcon className="icon ion-ios-cloud-download"/>
                    복원
                </ActionButton>
                <ActionButton variant="secondary" onClick={clean}>
                    <ActionButtonIcon className="icon ion-ios-compose"/>
                    정리
                </ActionButton>
                <ActionButton variant="danger" onClick={reset}>
                    <ActionButtonIcon className="icon ion-ios-trash"/>
                    초기화
                </ActionButton>
            </ActionBar>

            {previousBookmark && (
                <PreviousBookmarkToast>
                    <PreviousBookmarkContent>
                        <PreviousBookmarkIcon className="icon ion-ios-arrow-back"/>
                        <PreviousBookmarkInfo>
                            <PreviousBookmarkLabel>이전 소설</PreviousBookmarkLabel>
                            <PreviousBookmarkLink href={previousBookmark?.url ?? "#"}>
                                {previousBookmark?.title && previousBookmark?.chapter
                                    ? `${previousBookmark?.chapter} - ${previousBookmark?.title}`
                                    : "없음"
                                }
                            </PreviousBookmarkLink>
                        </PreviousBookmarkInfo>
                    </PreviousBookmarkContent>
                </PreviousBookmarkToast>
            )}
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

    const bookmarks = GM_getValue("bookmarks", {});

    const bookmark = Object.entries(bookmarks).filter(([, value]) => value.title === document.title.split("-")[2].trimStart()).pop();
    const previousBookmark = GM_getValue("previousBookmark", undefined);

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
    const [bookmarks, setBookmarks] = useState<Record<string, Bookmark>>(GM_getValue("bookmarks", {}));
    const [previousBookmark, setPreviousBookmark] = useState<Bookmark | undefined>(GM_getValue("previousBookmark", undefined));

    const chapter = $(NOVEL_EP).text().trim() ?? "EP.알 수 없음";
    const title = document.title.split("-")[2].trimStart() ?? "알 수 없음";

    let scrollTop = -1;
    let askAlert = true;

    if (bookmarks.hasOwnProperty(location.href) && (!GM_getValue("PreviousBookmark_First", false) && previousBookmark?.url !== location.href)) {
        scrollTop = bookmarks[location.href].scrollTop;

        if (GM_getValue("Bookmark_AutoUse", false))
            askAlert = false;

        if (GM_getValue("Bookmark_OneUse", false)) {
            const bookmarks1 = {...bookmarks};
            delete bookmarks1[location.href];

            setBookmarks(bookmarks1);
            GM_setValue("bookmarks", bookmarks1);
        }
    } else if (previousBookmark?.url === location.href) {
        scrollTop = previousBookmark.scrollTop;

        if (GM_getValue("PreviousBookmark_AutoUse", false))
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

        if (GM_getValue("PreviousBookmark", false)) {
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
        <ViewerBookmarkIcon
            className="icon ion-bookmark"
            onClick={click}
            active={isActive}
            {...longClick}
        />
    );
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
        if (!GM_getValue("Bookmark", false) && !GM_getValue("PreviousBookmark", false)) return;

        if (isPageViewer()) {
            unsafeWindow.toastr.info("페이지 방식은 지원하지 않습니다.", "북마크");
            return;
        }

        if (/^\/novel\//.test(location.pathname)) {
            const tr = $("div:not(.mobile_hidden) > .info-graybox");

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
};