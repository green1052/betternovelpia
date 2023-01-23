export {};

declare global {
    interface CustomWindow {
        Swiper: Function;
        toastr: {
            info(message: string, title?: string, overrides?: ToastrOptions): JQuery;
        };
        $: jQuery;
        jQuery: jQuery;

        getPageMark(): void;

        get_ad_banner(): void;

        up_down_btn_view(option: "on" | "off"): void;

        navi_view(): void;

        alarm_btn(): void;

        viewer_display(): void;

        get_comment_box(): void;

        get_comment_load(comment_re_no = 0, comment_ori_no = 0): void;

        novel_drawing(novel_d: NovelData[]): void;

        episode_vote(): void;
    }

    const unsafeWindow: CustomWindow & Window & typeof globalThis;

    type GMValue = "bookmarks" | "previousBookmark" | Config;

    function GM_getValue<T>(key: GMValue, defaultValue?: T): T

    function GM_setValue(key: GMValue, value: any): void

    function GM_deleteValue(key: GMValue): void

    function GM_listValues(): GMValue[]

    function GM_addStyle(css: string): void

    function GM_setClipboard(text: string): void

    function GM_xmlhttpRequest(details: {
        // Fields

        /**
         * The URL to make the request to. Must be an absolute URL, beginning
         * with the scheme. May be relative to the current page.
         */
        url: string;
        /** String type of HTTP request to make (E.G. "GET", "POST") */
        method:
            | 'GET'
            | 'POST'
            | 'PUT'
            | 'DELETE'
            | 'PATCH'
            | 'HEAD'
            | 'TRACE'
            | 'OPTIONS'
            | 'CONNECT';
        /**
         * When true, the data is sent as a Blob
         * @default false
         */
        binary?: boolean | undefined;
        /**
         * Any object (Compatibility: 1.10+). This object will also be the
         * context property of the Response Object.
         */
        context?: TContext | undefined;
        /**
         * Data to send in the request body. Usually for POST method requests.
         * If the data field contains form-encoded data, you usually must also
         * set the header `'Content-Type': 'application/x-www-form-urlencoded'`
         * in the `headers` field.
         */
        data?: string | undefined;
        /** A set of headers to include in the request */
        headers?: {
            [header: string]: string
        } | undefined;
        /**
         * A MIME type to specify with the request (e.g.
         * "text/html; charset=ISO-8859-1")
         */
        overrideMimeType?: string | undefined;
        /** User name to use for authentication purposes. */
        user?: string | undefined;
        /** Password to use for authentication purposes */
        password?: string | undefined;
        /** Decode the response as specified type. Default value is "text" */
        responseType?: XMLHttpRequestResponseType | undefined;
        /**
         * When `true`, this is a synchronous request.
         * Be careful: The entire Firefox UI will be locked and frozen until the
         * request completes.In this mode, more data will be available in the
         * return value.
         */
        synchronous?: boolean | undefined;
        /**
         * The number of milliseconds to wait before terminating the call. Zero
         * (the default) means wait forever.
         */
        timeout?: number | undefined;
        /**
         * Object containing optional function callbacks to monitor the upload
         * of data.
         */
        upload?: {
            onabort?(response: Response<TContext>): void
            onerror?(response: Response<TContext>): void
            onload?(response: Response<TContext>): void
            onprogress?(response: ProgressResponse<TContext>): void
        } | undefined;

        // Event handlers

        /** Will be called when the request is aborted */
        onabort?(response: Response<TContext>): void;

        /** Will be called if an error occurs while processing the request */
        onerror?(response: Response<TContext>): void;

        /** Will be called when the request has completed successfully */
        onload?(response: Response<TContext>): void;

        /** Will be called when the request progress changes */
        onprogress?(response: ProgressResponse<TContext>): void;

        /** Will be called repeatedly while the request is in progress */
        onreadystatechange?(response: Response<TContext>): void;

        /** Will be called if/when the request times out */
        ontimeout?(response: Response<TContext>): void;
    }): void
}