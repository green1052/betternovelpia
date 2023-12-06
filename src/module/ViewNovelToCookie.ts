import {fakeViewer} from "../util/FakeViewer";
import {viewerData} from "../util/ViewerData";
import Cookies from "js-cookie";

function resetCookie(name: string, value: string) {
    Cookies.set(name, value, {
        domain: ".novelpia.com",
        path: "/",
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    });
}

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
        const blocked = document.querySelector<HTMLElement>("#payment_app");

        if (!blocked || blocked.style.display === "none")
            return;

        const loginKey = GM_getValue("ViewNovelToCookie_LOGINKEY", "") as string;
        const userKey = GM_getValue("ViewNovelToCookie_USERKEY", "") as string;

        if (!loginKey || !userKey)
            return;

        // const oldLoginKey = Cookies.get("LOGINKEY") ?? "";
        // const oldUserKey = Cookies.get("USERKEY") ?? "";
        //
        // resetCookie("LOGINKEY", loginKey);
        // resetCookie("USERKEY", userKey);

        // const data = await viewerData(location.pathname.substring(8), () => {
        //     resetCookie("LOGINKEY", oldLoginKey);
        //     resetCookie("USERKEY", oldUserKey);
        // });

        const data = await viewerData(location.pathname.substring(8), `LOGINKEY=${loginKey}; USERKEY=${userKey};`);

        if (data.length <= 0)
            return;

        fakeViewer(blocked, data);

        const oldGetCommentBox = unsafeWindow.get_comment_box
            .toString()
            .replace("response.status == '200'", `response.status == '200' || response.errmsg.startsWith("PLUS")`);

        unsafeWindow.get_comment_box = () => eval(`${oldGetCommentBox}get_comment_box()`);
    }
} as Module;
