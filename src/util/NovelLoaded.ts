import {hookSiteFunction} from "./SiteHook";

export function novelLoaded(func: () => void | Promise<void>) {
    hookSiteFunction("novel_drawing", func, {requireViewer: true, onWindowLoad: true});
}
