interface NovelData {
    text: string;
    size: number;
    align: string;
}

interface Window {
    playAlert: number | undefined;
    data_load: 0 | 1;
    favoriDepth: number;
    novel_data: NovelData[] | [];
    toggle_navi: 0 | 1;
    Swiper: (...args: unknown[]) => unknown;
    toastr: {
        info(message: string, title?: string, overrides?: Record<string, unknown>): void;
    };
    emoticon_open(idx: string): void;
    navi_view(): void;
    novel_drawing(novel_d: NovelData[]): void;
    comment_load(): void;
    episode_list_viewer(page?: number): void;
    bookmark(): void;
    check_start_position(): void;
    getPageMark(): void;
    makePageMark(): void;
    updateMark(): void;
    updateMarkEpis(): void;
    get_ad_banner(): void;
    up_down_btn_view(option: "on" | "off"): void;
    alarm_btn(): void;
    viewer_display(): void;
    get_comment_box(): void;
    get_comment_load(comment_re_no?: number, comment_ori_no?: number): void;
    episode_vote(): void;
}
