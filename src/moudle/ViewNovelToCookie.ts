import $ from "jquery";
import Cookies from "js-cookie";
import {fakeViewer} from "../util/FakeViewer";

export default {start};

function resetCookie(name: string, value: string) {
    Cookies.remove(name);
    Cookies.set(name, value, {
        domain: ".novelpia.com",
        path: "/",
        expires: 7
    });
}

function start() {
    if (!GM_config.get("ViewNovelToCookie") || !location.pathname.includes("/viewer/"))
        return;

    const locked = $(".ion-locked").parent();

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

    $.ajax({
        data: {"size": "14"},
        type: "POST",
        dataType: "JSON",
        url: `/proc/viewer_data/${location.pathname.substring(8)}`,
        cache: false,
        success: (data) => {
            const json_m: { text: string, size: number, align: string }[] = [];

            for (const string of data["s"]) {
                const json_t = {
                    text: string["text"],
                    size: 11,
                    align: "left"
                };

                json_m.push(json_t);
            }

            fakeViewer(locked, json_m);
        },
        complete: () => {
            resetCookie("LOGINKEY", oldLoginKey);
            resetCookie("USERKEY", oldUserKey);
        }
    });
}