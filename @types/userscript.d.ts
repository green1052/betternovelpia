type Config =
    "BetterSideView" |
    "HideEvent" |
    "HideAddNovel" |
    "InfoUnfold" |
    "DBNextChapter" |
    "FreeEmoji" |
    "NovelDownload" |
    "NovelListFix" |
    "PreviousBookmark" |
    "PreviousBookmark_First" |
    "PreviousBookmark_OnlyUse" |
    "PreviousBookmark_AutoUse" |
    "Bookmark" |
    "Bookmark_OnlyUse" |
    "Bookmark_AutoUse" |
    "DisableViewLog" |
    "AbsoluteBlockKey";

interface Field {
    label: string,
    section?: any[],
}

interface Text extends Field {
    type: "text",
    title: string,
    size: number
}

interface Int extends Field {
    type: "int",
    min: number,
    max: number
}

interface Float extends Field {
    type: "unsigned float"
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
        [key in Config]: Text | Int | Float | Checkbox | Select | Radio | Textarea | Hidden | Button
    },
    events: {
        init?: Function<void>,
        open?: Function<void>,
        save?: Function<void>,
        close?: Function<void>,
        reset?: Function<void>
    }
}

declare const unsafeWindow: any;

declare const GM: {
    getValue(name: any): Promise<any>
    setValue(name: any, value: any): any
};

declare const GM_config: {
    init(option: Configs): any,
    get(key: Config): any,
    open(): void
};