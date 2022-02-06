export function novelLoad(func: () => void | Promise<void>) {
    const oldNovelDrawing = unsafeWindow.novel_drawing;

    unsafeWindow.novel_drawing = (novel_d) => {
        oldNovelDrawing(novel_d);
        setTimeout(func, 500);
    };
}