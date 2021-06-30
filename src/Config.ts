export default {Init, Open, GetConfig, GetValue, SetValue};

let inited = false;

function Init() {
    if (inited)
        throw Error("already inited");

    inited = true;

    // @ts-ignore
    GM_config.init({
        "id": "betternovelpia",
        "title": `BetterNovelpia - 2.5.5`,
        "fields": {
            "BetterSideView": {
                "label": "사이드뷰 개선",
                "type": "checkbox",
                "default": false
            },
            "HideEvent": {
                "label": "이벤트 숨기기",
                "type": "checkbox",
                "default": false
            },
            "HideAddNovel": {
                "label": "소설 등록 숨기기",
                "type": "checkbox",
                "default": false
            },
            "InfoUnfold": {
                "label": "상세정보 항상 보기",
                "type": "checkbox",
                "default": false
            },
            "DBNextChapter": {
                "label": "더블 클릭으로 다음 회차",
                "type": "checkbox",
                "default": false
            },
            "FreeEmoji": {
                "label": "유로 이모지 무료 사용",
                "type": "checkbox",
                "default": false
            },
            "DisableViewLog": {
                "label": "뷰어 디버그 로그 제거",
                "type": "checkbox",
                "default": false
            },
            "PreviousBookmark":
                {
                    "label": "이전 회차 북마크 개선",
                    "type": "checkbox",
                    "default": false,
                    "section": ["북마크 설정"]
                },
            "PreviousBookmark_First": {
                "label": "이전 회차 북마크 우선",
                "type": "checkbox",
                "default": false
            },
            "PreviousBookmark_OnlyUse": {
                "label": "이전 회차 북마크 한번만 사용",
                "type": "checkbox",
                "default": false
            },
            "PreviousBookmark_AutoUse": {
                "label": "이전 회차 북마크 자동 이동",
                "type": "checkbox",
                "default": false
            },
            "Bookmark": {
                "label": "북마크 사용",
                "type": "checkbox",
                "default": false
            },
            "Bookmark_OnlyUse": {
                "label": "북마크 한번만 사용",
                "type": "checkbox",
                "default": false
            },
            "Bookmark_AutoUse": {
                "label": "북마크 자동 이동",
                "type": "checkbox",
                "default": false
            }
        },
        "events": {
            "save": () => {
                location.reload();
            }
        }
    });
}

function Open() {
    // @ts-ignore
    GM_config.open();
}

function GetConfig(key: string) {
    // @ts-ignore
    return GM_config.get(key);
}

async function GetValue(key: string) {
    // @ts-ignore
    return await GM.getValue(key);
}

function SetValue(key: string, value: any) {
    // @ts-ignore
    return GM.setValue(key, value);
}