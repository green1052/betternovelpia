export {};

declare global {
    interface CustomWindow {
        up_down_btn_view: Function;
        navi_view: Function;
    }

    const unsafeWindow: CustomWindow & Window & typeof globalThis;

    type GMValue = "bookmarks" | "previousBookmark" | Config;

    function GM_getValue(key: GMValue, defaultValue?: unknown): unknown

    function GM_setValue(key: GMValue, value: any): void

    function GM_setClipboard(data: string, type: string = "text/plain"): undefined
}