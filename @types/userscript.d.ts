type Config =
    "AbsoluteViewerDrag" |
    "BetterSideView" |
    "Bookmark" |
    "Bookmark_AutoUse" |
    "Bookmark_OnlyUse" |
    "DBNextChapter" |
    "DisableViewLog" |
    "FreeEmoji" |
    "HideAddNovel" |
    "HideEvent" |
    "InfoUnfold" |
    "NovelDownload" |
    "NovelListFix" |
    "PreviousBookmark" |
    "PreviousBookmark_AutoUse" |
    "PreviousBookmark_First" |
    "PreviousBookmark_OnlyUse" |
    "PrivateMode" |
    "PrivateNovelBypass" |
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
    fields: {
        [key in Config]: Texts | Int | Float | Checkbox | Select | Radio | Textarea | Hidden | Button
    },
    events: {
        init?: Function<void>,
        open?: Function<void>,
        save?: Function<void>,
        close?: Function<void>,
        reset?: Function<void>
    }
}

declare const unsafeWindow: {
    [key: string]: any
};

declare const GM: {
    getValue(name: any): Promise<any>
    setValue(name: any, value: any): void
};

declare const GM_config: {
    init(option: Configs): void,
    get(key: Config, defaults?: any): any,
    open(): void
};