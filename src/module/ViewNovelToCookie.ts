import $ from "jquery";
import {fakeViewer} from "../util/FakeViewer";
import {viewerData} from "../util/ViewerData";

export default {
    include: /^\/viewer\//,
    enable: ["ViewNovelToCookie"],
    config: {
        head: "다른 쿠키로 Plus 소설 보기",
        configs: {
            ViewNovelToCookie: {
                label: "활성화",
                type: "checkbox",
                default: false
            },
            ViewNovelToCookie_LOGINKEY: {
                label: "LOGINKEY",
                type: "text"
            },
            ViewNovelToCookie_USERKEY: {
                label: "USERKEY",
                type: "text"
            }
        }
    },
    async start() {
        const blocked = $(".one-event-viewer-plus");

        if (!blocked.length) return;

        const loginKey = GM_getValue<string>("ViewNovelToCookie_LOGINKEY", "");
        const userKey = GM_getValue<string>("ViewNovelToCookie_USERKEY", "");

        if (!loginKey || !userKey)
            return;

        const data = await viewerData(location.pathname.substring(8), `LOGINKEY=${loginKey}; USERKEY=${userKey}`);

        if (!data.length) return;

        fakeViewer(blocked, data);

        const oldGetCommentBox = unsafeWindow.get_comment_box
            .toString()
            .replace("response.status == '200'", `response.status == '200' || response.errmsg.includes("PLUS")`);

        unsafeWindow.get_comment_box = () => eval(`${oldGetCommentBox}get_comment_box()`);
    }
} as Module;