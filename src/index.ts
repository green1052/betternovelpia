import $ from "jquery";
import Setting from "./core/Setting";

GM_config.init({
    id: "betternovelpia",
    title: `BetterNovelpia - ${VERSION}`,
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
        NovelListFix: {
            label: "소설 목록 개선",
            type: "checkbox",
            default: false
        },

        AbsoluteViewerDrag: {
            label: "뷰어 드래그 허용",
            type: "checkbox",
            default: false,
            section: ["뷰어 설정"]
        },
        DBNextChapter: {
            label: "더블 클릭으로 다음 회차",
            type: "checkbox",
            default: false
        },
        TripleNextChapter: {
            label: "트리플 클릭으로 다음 회차",
            type: "checkbox",
            default: false
        },
        PreLoadComment: {
            label: "댓글 미리 불러오기",
            type: "checkbox",
            default: false
        },
        NovelDownload: {
            label: "소설 다운로드 사용",
            type: "checkbox",
            default: false
        },
        UrlPrettier: {
            label: "URL a href 적용",
            type: "checkbox",
            default: false
        },
        PrivateMode: {
            label: "프라이빗 모드",
            type: "checkbox",
            default: false
        },
        FreeEmoji: {
            label: "유로 이모지 무료 사용",
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

        PreviousBookmark: {
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
        PreviousBookmark_OneUse: {
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

        DisableViewLog: {
            label: "뷰어 디버그 로그 제거",
            type: "checkbox",
            default: false,
            section: ["디버깅"]
        },
        Eval: {
            label: "eval 사용",
            type: "checkbox",
            default: false
        }
    },
    events: {
        save: () => {
            $(".loads").show();
            location.reload();
        }
    }
});

$(() => {
    Setting.start();

    const context = require.context("./module/", true, /\.ts$/);

    for (const key of context.keys()) {
        const start = performance.now();

        try {
            const module: Module = context(key).default;

            if ((module.url === undefined || module.url.test(location.href)) &&
                (module.enable === undefined || !module.enable.map(setting => GM_config.get(setting)).includes(false))) {
                console.log(`${key}: 불러오는 중...`);

                module.start();

                console.log(`${key}: 로드됨 ${(performance.now() - start).toFixed(2)}ms\n`);
            }
        } catch (e) {
            console.error(`${key}: ${e}\n`);
        }
    }
});