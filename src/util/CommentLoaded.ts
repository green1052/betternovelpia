export function commentLoaded(func: () => void | Promise<void>) {
    if (!location.pathname.startsWith("/viewer/")) throw "is not viewer";

    const oldCommentLoad = unsafeWindow.get_comment_load;

    unsafeWindow.get_comment_load = (comment_re_no = 0, comment_ori_no = 0) => {
        oldCommentLoad(comment_re_no, comment_ori_no);
        setTimeout(func, 500);
    };
}