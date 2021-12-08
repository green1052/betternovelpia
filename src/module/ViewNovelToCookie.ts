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
            ViewNoelToCookie_LOGINKEY: {
                label: "LOGINKEY",
                type: "text"
            },
            ViewNoelToCookie_USERKEY: {
                label: "USERKEY",
                type: "text"
            }
        }
    },
    async start() {
        const blocked = $(`p:contains("플러스 멤버십이"), p:contains("열람에 회원가입/로그인이")`);

        if (!blocked.length)
            return;

        const loginKey = GM_getValue("ViewNoelToCookie_LOGINKEY", "") as string;
        const userKey = GM_getValue("ViewNoelToCookie_USERKEY", "") as string;

        if (!loginKey || !userKey)
            return;

        const data = await viewerData(location.pathname.substring(8), {
            LOGINKEY: loginKey,
            USERKEY: userKey
        });

        if (data.length > 0)
            fakeViewer(blocked, data);
    }
} as Module;