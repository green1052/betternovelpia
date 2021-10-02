export {};

declare global {
    type Config =
        "AbsoluteViewerDrag" |
        "BetterSideView" |
        "Bookmark" |
        "Bookmark_AutoUse" |
        "Bookmark_OneUse" |
        "DBNextChapter" |
        "DisableViewLog" |
        "Eval" |
        "FreeEmoji" |
        "HideAddNovel" |
        "HideEvent" |
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
        "ViewNovelToCookie" |
        "TripleNextChapter";

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
            init?: () => void,
            open?: () => void,
            save?: () => void,
            close?: () => void,
            reset?: () => void
        }
    }

    const unsafeWindow: {
        [key: string]: any
    };

    type GMValue = "bookmarks" | "previousBookmark";

    const GM: {
        getValue(name: GMValue): Promise<any>
        setValue(name: GMValue, value: any): void
        setClipboard(text: string): void;
    };

    const GM_config: {
        init(option: Configs): void,
        get(key: Config, defaults?: any): any,
        open(): void
    };

    const VERSION: string;
}