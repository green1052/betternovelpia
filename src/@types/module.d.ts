export {};

interface Field {
    label: string,
}

interface Text extends Field {
    type: "text",
    default?: string
}

interface Int extends Field {
    type: "int",
    min: number,
    max: number,
    default?: number
}

interface Checkbox extends Field {
    type: "checkbox",
    default: boolean,
}

declare global {
    type Config =
        "AbsoluteDrag" |
        "AutoRecommend" |
        "Bookmark" |
        "Bookmark_AutoUse" |
        "Bookmark_OneUse" |
        "Bookmark_Sort" |
        "ClickNextChapter" |
        "CommentBlockUser" |
        "DisableNovelAlert" |
        "DisableViewLog" |
        "Eval" |
        "FreeBadge" |
        "FreeEmoji" |
        "HideAddNovel" |
        "HideEvent" |
        "HideNotice" |
        "HideOnlyEmojiComment" |
        "HideOnlyEmojiComment_Remove" |
        "HidePlus" |
        "HideRecommendEffect" |
        "HideReview" |
        "HideViewerThumbnail" |
        "HideAd" |
        "InfoUnfold" |
        "NaviColor" |
        "NaviScrollHide" |
        "NovelDownload" |
        "NovelDownload_Copy" |
        "PreLoadComment" |
        "PreLoadEpisodeList" |
        "PreviousBookmark" |
        "PreviousBookmark_AutoUse" |
        "PreviousBookmark_First" |
        "PrivateMode" |
        "RecommendAllNovel" |
        "ViewNovelToCookie_LOGINKEY" |
        "ViewNovelToCookie_USERKEY" |
        "ViewNovelToCookie" |
        "AllowDrag";

    interface Configs {
        head: string,
        configs: {
            [key in Config]: Text | Int | Checkbox
        }
    }

    interface ModuleInfo {
        name: string,
        module: Module
    }

    interface Module {
        include?: RegExp;
        exclude?: RegExp;
        enable?: Config[];
        config?: Configs;
        property?: "start" | "end";

        start(): void | Promise<void>;
    }
}
