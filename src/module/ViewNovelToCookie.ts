import $ from "jquery";
import Cookies from "js-cookie";
import {fakeViewer} from "../util/FakeViewer";
import {LOCKED} from "../util/Selectors";
import {viewerData} from "../util/ViewerData";

export default {
    url: /^\/viewer\//,
    enable: ["ViewNovelToCookie"],
    start() {
        function resetCookie(name: string, value: string) {
            Cookies.set(name, value, {
                domain: ".novelpia.com",
                path: "/",
                expires: new Date().setFullYear(new Date().getFullYear() + 1)
            });
        }

        const locked = $(LOCKED).parent();

        if (!locked.text().includes("Plus멤버십 가입하기") && !locked.text().includes("열람에 회원가입/로그인이 필요한 회차입니다"))
            return;

        const loginKey: string | undefined = GM_config.get("ViewNoelToCookie_LOGINKEY");
        const userKey: string | undefined = GM_config.get("ViewNoelToCookie_USERKEY");

        if (!loginKey || !userKey)
            return;

        const oldLoginKey = Cookies.get("LOGINKEY") ?? "";
        const oldUserKey = Cookies.get("USEFRKEY") ?? "";

        resetCookie("LOGINKEY", loginKey);
        resetCookie("USERKEY", userKey);

        const data = viewerData(location.pathname.substring(8), () => {
            resetCookie("LOGINKEY", oldLoginKey);
            resetCookie("USERKEY", oldUserKey);
        });

        if (data.length > 0)
            fakeViewer(locked, data);
    }
} as Module;