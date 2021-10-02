export {};

declare global {
    function emoticon_open(idx: string): void

    function EmoticonView(group: string, url: string, emNo: string, fav: string, onoff: string): void

    var playAlert: number | undefined;

    var data_load: 0 | 1;

    var favoriDepth: number;

    interface NovelData {
        text: string,
        size: number,
        align: string
    }

    var novel_data: NovelData[] | [];

    function comment_load(): void;

    function novel_drawing(novel_d: NovelData[]): void;
}