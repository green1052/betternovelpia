import {hookSiteFunction} from "./SiteHook";

export function commentLoaded(func: () => void | Promise<void>) {
    hookSiteFunction("get_comment_load", func, {requireViewer: true, delay: 500});
}
