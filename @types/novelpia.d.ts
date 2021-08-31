declare function emoticon_open(idx: string): void

declare var playAlert: number | undefined;

declare var data_load: 0 | 1;

interface NovelData {
    text: string,
    size: number,
    align: string
}

declare var novel_data: NovelData[] | [];

declare function novel_drawing(novel_d: NovelData[]): void;