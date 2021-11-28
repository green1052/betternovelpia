export {};

interface Field {
    label: string,
}

interface Texts extends Field {
    type: "text",
    title: string
}

interface Checkbox extends Field {
    type: "checkbox",
    default: boolean,
}

declare global {
    type Config =
        "AbsoluteViewerDrag" |
        "BetterSideView" |
        "Bookmark" |
        "Bookmark_AutoUse" |
        "Bookmark_OneUse" |
        "ClickNextChapter" |
        "DisableNovelAlert" |
        "DisableViewLog" |
        "Eval" |
        "FreeEmoji" |
        "HideAddNovel" |
        "HideEvent" |
        "HideNotice" |
        "HidePlus" |
        "HideAd" |
        "InfoUnfold" |
        "NovelDownload" |
        "NovelListFix" |
        "PreLoadComment" |
        "PreLoadEpisodeList" |
        "PreviousBookmark" |
        "PreviousBookmark_AutoUse" |
        "PreviousBookmark_First" |
        "PreviousBookmark_OneUse" |
        "PrivateMode" |
        "UrlPrettier" |
        "ViewNoelToCookie_LOGINKEY" |
        "ViewNoelToCookie_USERKEY" |
        "ViewNovelToCookie";

    interface Configs {
        head: string,
        configs: {
            [key in Config]: Texts | Checkbox
        }
    }

    interface Module {
        url?: RegExp;
        enable?: Config[];
        config?: Configs,

        start(): void | Promise<void>;
    }
}