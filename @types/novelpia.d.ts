declare function emoticon_open(idx: string): void

declare function EmoticonView(group: string, url: string, emNo: string, fav: string, onoff: string): void

declare var playAlert: number | undefined;

declare var data_load: 0 | 1;

declare var favoriDepth: number;

interface NovelData {
    text: string,
    size: number,
    align: string
}

declare var novel_data: NovelData[] | [];

declare function comment_load(): void;

declare function novel_drawing(novel_d: NovelData[]): void;