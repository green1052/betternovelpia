export {};

declare global {
    interface Bookmarks {
        [url: string]: Bookmark;
    }

    interface Bookmark {
        scrollTop: number;
        title: string;
        chapter: string;
    }

    interface PreviousBookmark {
        title: string;
        chapter: string;
        url: string;
        scrollTop: number;
    }
}