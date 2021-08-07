declare function emoticon_open(idx: string): void

declare function up_down_btn_view(option: any): void

declare var playAlert: setInterval | undefined;

declare var data_load: 0 | 1;

type novelData = { text: string, size: number, align: string }[];

declare var novel_data: [] | novelData;

declare function novel_drawing(novel_d: novelData): void;