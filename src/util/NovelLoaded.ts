export function novelLoaded(func: () => void | Promise<void>) {
    if (!location.pathname.startsWith("/viewer/")) throw "is not viewer";

    const oldNovelDrawing = unsafeWindow.novel_drawing;

    unsafeWindow.novel_drawing = (novel_d) => {
        oldNovelDrawing(novel_d);
        setTimeout(func, 500);
    };
}