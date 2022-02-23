export {};

declare global {
    function emoticon_open(idx: string): void

    var playAlert: number | undefined;

    var data_load: 0 | 1;

    var favoriDepth: number;

    interface NovelData {
        text: string,
        size: number,
        align: string
    }

    var novel_data: NovelData[] | [];

    var toggle_navi: 0 | 1;

    function navi_view(): void;

    function novel_drawing(novel_d: NovelData[]): void;

    function comment_load(): void;

    function episode_list_viewer(page: number): void;
}