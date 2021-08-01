export default {Start};
import Cookies from "js-cookie";
import $ from "jquery";

function ResetCookie(name: string, value: string) {
    Cookies.remove(name);
    Cookies.set(name, value, {
        domain: ".novelpia.com",
        path: "/",
        expires: 7
    });
}

function Start() {
    if (!GM_config.get("ViewNovelToCookie") || !location.pathname.includes("/viewer/"))
        return;

    const locked = $(".ion-locked").parent();

    if (!locked.text().includes("Plus멤버십 가입하기"))
        return;

    const loginKey = GM_config.get("ViewNoelToCookie_LOGINKEY");
    const userKey = GM_config.get("ViewNoelToCookie_USERKEY");

    if (!loginKey || !userKey)
        return;

    const oldLoginKey = Cookies.get("LOGINKEY") ?? "";
    const oldUserKey = Cookies.get("USERKEY") ?? "";

    ResetCookie("LOGINKEY", loginKey);
    ResetCookie("USERKEY", userKey);

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

            novel_data = json_m;

            locked
                .parent()
                .append(`<ol id="novel_drawing" class="no-drag np" onclick="navi_view();" style="padding:0px;margin:0px;">`);

            locked.remove();

            setTimeout(() => {
                data_load = 1;
                novel_drawing(novel_data);
            }, 10);
        },
        complete: () => {
            ResetCookie("LOGINKEY", oldLoginKey);
            ResetCookie("USERKEY", oldUserKey);
        }
    });
}