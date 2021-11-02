export {};

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
        "InfoUnfold" |
        "NovelDownload" |
        "NovelListFix" |
        "PreLoadComment" |
        "PreviousBookmark" |
        "PreviousBookmark_AutoUse" |
        "PreviousBookmark_First" |
        "PreviousBookmark_OneUse" |
        "PrivateMode" |
        "UrlPrettier" |
        "ViewNoelToCookie_LOGINKEY" |
        "ViewNoelToCookie_USERKEY" |
        "ViewNovelToCookie";

    interface Field {
        label: string,
        section?: any[],
    }

    interface Texts extends Field {
        type: "text",
        title: string,
        size: number,
        default: any
    }

    interface Int extends Field {
        type: "int",
        min: number,
        max: number,
        default: number
    }

    interface Float extends Field {
        type: "unsigned float",
        default: number
    }

    interface Checkbox extends Field {
        type: "checkbox",
        default: boolean,
    }

    interface Select extends Field {
        type: "select",
        options: any[]
        default: any,
    }

    interface Radio extends Field {
        type: "radio",
        options: any[]
        default: any,
    }

    interface Textarea extends Field {
        type: "textarea",
        default: any,
    }

    interface Hidden extends Field {
        type: "hidden",
        value: any,
    }

    interface Button extends Field {
        type: "button",
        size: number,
        click: Function<void>
    }

    interface Configs {
        id: string,
        title: string,
        fields?: {
            [key in Config]: Texts | Int | Float | Checkbox | Select | Radio | Textarea | Hidden | Button
        },
        events: {
            save?: () => void
        }
    }

    interface CustomWindow {
        up_down_btn_view: Function;
        navi_view: Function;
    }

    const unsafeWindow: CustomWindow & Window & typeof globalThis;

    type GMValue = "bookmarks" | "previousBookmark";

    function GM_getValue(key: GMValue, defaultValue?: any): any

    function GM_setValue(key: GMValue, value: any): void

    function GM_setClipboard(data: string, type: string = "text/plain"): undefined

    const GM_config: {
        init(option: Configs): void,
        get(key: Config, defaults?: any): any,
        open(): void
    };
}