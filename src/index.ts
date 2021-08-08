import $ from "jquery";
import Setting from "./core/Setting";
import AbsoluteViewerDrag from "./moudle/AbsoluteViewerDrag";
import BetterSideView from "./moudle/BetterSideView";
import Bookmark from "./moudle/Bookmark";
import DBNextChapter from "./moudle/DBNextChapter";
import DisableViewerLog from "./moudle/debug/DisableViewerLog";
import FreeEmoji from "./moudle/FreeEmoji";
import HideAddNovel from "./moudle/HideAddNovel";
import HideEvent from "./moudle/HideEvent";
import InfoUnfold from "./moudle/InfoUnfold";
import NovelDownload from "./moudle/NovelDownload";
import NovelListFix from "./moudle/NovelListFix";
import PrivateMode from "./moudle/PrivateMode";
import PrivateNovelBypass from "./moudle/PrivateNovelBypass";
import UrlPrettier from "./moudle/UrlPrettier";
import ViewNovelToCookie from "./moudle/ViewNovelToCookie";

GM_config.init({
    id: "betternovelpia",
    title: "BetterNovelpia - 3.11.5",
    fields: {
        BetterSideView: {
            label: "사이드뷰 개선",
            type: "checkbox",
            default: false,
            section: ["일반 설정"]
        },
        HideEvent: {
            label: "이벤트 숨기기",
            type: "checkbox",
            default: false
        },
        HideAddNovel: {
            label: "소설 등록 숨기기",
            type: "checkbox",
            default: false
        },
        InfoUnfold: {
            label: "상세정보 항상 보기",
            type: "checkbox",
            default: false
        },
        DBNextChapter: {
            label: "더블 클릭으로 다음 회차",
            type: "checkbox",
            default: false
        },
        FreeEmoji: {
            label: "유로 이모지 무료 사용",
            type: "checkbox",
            default: false
        },
        NovelDownload: {
            label: "소설 다운로드 사용",
            type: "checkbox",
            default: false
        },
        NovelListFix: {
            label: "소설 목록 개선",
            type: "checkbox",
            default: false
        },
        PrivateNovelBypass: {
            label: "공개 예정 소설 보기",
            type: "checkbox",
            default: false
        },
        UrlPrettier: {
            label: "URL a href 적용",
            type: "checkbox",
            default: false
        },
        ViewNovelToCookie: {
            label: "다른 쿠키로 Plus 소설 보기",
            type: "checkbox",
            default: false
        },
        ViewNoelToCookie_LOGINKEY: {
            label: "LOGINKEY",
            title: "LOGINKEY",
            type: "text",
            size: 10,
            default: undefined
        },
        ViewNoelToCookie_USERKEY: {
            label: "USERKEY",
            title: "USERKEY",
            type: "text",
            size: 10,
            default: undefined
        },
        PrivateMode: {
            label: "프라이빗 모드",
            type: "checkbox",
            default: false
        },
        AbsoluteViewerDrag: {
            label: "뷰어 드래그 허용",
            type: "checkbox",
            default: false
        },
        PreviousBookmark:
            {
                label: "이전 회차 북마크 개선",
                type: "checkbox",
                default: false,
                section: ["북마크 설정"]
            },
        PreviousBookmark_First: {
            label: "이전 회차 북마크 우선",
            type: "checkbox",
            default: false
        },
        PreviousBookmark_OnlyUse: {
            label: "이전 회차 북마크 한번만 사용",
            type: "checkbox",
            default: false
        },
        PreviousBookmark_AutoUse: {
            label: "이전 회차 북마크 자동 이동",
            type: "checkbox",
            default: false
        },
        Bookmark: {
            label: "북마크 사용",
            type: "checkbox",
            default: false
        },
        Bookmark_OnlyUse: {
            label: "북마크 한번만 사용",
            type: "checkbox",
            default: false
        },
        Bookmark_AutoUse: {
            label: "북마크 자동 이동",
            type: "checkbox",
            default: false
        },
        DisableViewLog:
            {
                label: "뷰어 디버그 로그 제거",
                type: "checkbox",
                default: false,
                section: ["디버깅"]
            }
    },
    events: {
        save: () => location.reload()
    }
});

$(() => {
    // core
    Setting.start();

    // module
    AbsoluteViewerDrag.start();
    BetterSideView.start();
    Bookmark.start();
    DBNextChapter.start();
    FreeEmoji.start();
    HideAddNovel.start();
    HideEvent.start();
    InfoUnfold.start();
    NovelDownload.start();
    NovelListFix.start();
    PrivateMode.start();
    PrivateNovelBypass.start();
    UrlPrettier.start();
    ViewNovelToCookie.start();

    // debug
    DisableViewerLog.start();
});