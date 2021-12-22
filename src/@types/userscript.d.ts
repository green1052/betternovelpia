export {};

declare global {
    interface CustomWindow {
        up_down_btn_view: Function;
        navi_view: Function;
        alarm_btn: Function;
        viewer_display: Function;
        comment_load: Function;
        option_proc: Function;
    }

    const unsafeWindow: CustomWindow & Window & typeof globalThis;

    type GMValue = "bookmarks" | "previousBookmark" | Config;

    function GM_getValue(key: GMValue, defaultValue?: unknown): unknown

    function GM_setValue(key: GMValue, value: any): void

    function GM_deleteValue(key: GMValue): void

    function GM_listValues(): GMValue[]

    function GM_setClipboard(data: string, type: string = "text/plain"): undefined

    interface ResponseType {
        status: number;
        statusText: string;
        readyState: number;
        responseHeaders: string,
        response: string | Blob | ArrayBuffer | Document | Object | null
        responseText: string | undefined,
        finalUrl: string,
        context: any,
    }

    function GM_xmlhttpRequest(details: {
        url: string,
        method?: string,
        user?: string,
        password?: string,
        overrideMimeType?: string,
        headers?: { [key in string]: string },
        responseType?: "text" | "json" | "blob" | "arraybuffer" | "document"
        timeout?: number,
        data?: string | FormData | Blob,
        binary?: boolean,
        context?: any,
        anonymous?: boolean,
        abort?(): void,
        onabort?(response: ResponseType): void,
        onerror?(response: ResponseType): void,
        onload?(response: ResponseType): void,
        onloadend?(response: ResponseType): void,
        onloadstart?(response: ResponseType): void,
        onprogress?(response: ResponseType): void,
        onreadystatechange?(response: ResponseType): void,
        ontimeout?(response: ResponseType): void
    }): void
}