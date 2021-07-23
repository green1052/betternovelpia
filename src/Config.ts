export default {Init, GetConfig, GetValue, SetValue};

type Config =
    "BetterSideView" |
    "HideEvent" |
    "HideAddNovel" |
    "InfoUnfold" |
    "DBNextChapter" |
    "FreeEmoji" |
    "NovelDownload" |
    "PreviousBookmark" |
    "PreviousBookmark_First" |
    "PreviousBookmark_OnlyUse" |
    "PreviousBookmark_AutoUse" |
    "Bookmark" |
    "Bookmark_OnlyUse" |
    "Bookmark_AutoUse" |
    "DisableViewLog" |
    "AbsoluteBlockKey";

interface Configs {
    id: string,
    title: string,
    fields: {
        [key in Config]: {
            label: string,
            type: string,
            default: any,
            section?: string[]
        }
    },
    events: {
        save: Function
    }
}

function Init(config: Configs) {
    // @ts-ignore
    GM_config.init(config);
}

function GetConfig(key: Config) {
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