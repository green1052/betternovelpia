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

    function GM_setClipboard(data: string, type = "text/plain"): undefined

    function GM_download(options: { url: string, name?: string, onload?: Function, }): void

}