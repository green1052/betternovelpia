export {};

declare global {
    interface Bookmark {
        scrollTop: number;
        title: string;
        chapter: string;
        url?: string;
    }
}
