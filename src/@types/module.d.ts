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
        "BetterSideView" |
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
        "PreviousBookmark_OneUse" |
        "PrivateMode" |
        "RecommendAllNovel" |
        "UrlPrettier" |
        "ViewNovelToCookie_LOGINKEY" |
        "ViewNovelToCookie_USERKEY" |
        "ViewNovelToCookie";

    interface Configs {
        head: string,
        configs: {
            [key in Config]: Text | Int | Checkbox
        }
    }

    interface Module {
        include?: RegExp;
        exclude?: RegExp;
        enable?: Config[];
        config?: Configs;

        start(): void | Promise<void>;
    }
}