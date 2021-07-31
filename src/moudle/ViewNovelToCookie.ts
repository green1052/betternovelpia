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
    if (!GM_config.get("ViewNovelToCookie") || !location.pathname.includes("/novel/"))
        return;

    const loginKey = GM_config.get("ViewNoelToCookie_LOGINKEY");
    const userKey = GM_config.get("ViewNoelToCookie_USERKEY");

    if (!loginKey || !userKey)
        return;

    const oldLoginKey = Cookies.get("LOGINKEY") ?? "";
    const oldUserKey = Cookies.get("USERKEY") ?? "";

    const observer = new MutationObserver(() => {
        $("#episode_list > table:nth-child(1) > tbody:nth-child(1) tr").each((index, element) => {
            const td = $(element).children().eq(1);
            const onclick = td.attr("onclick");

            if (!onclick)
                return;

            const click = onclick.substring(39, onclick.length - 2);

            td
                .removeAttr("onclick")
                .on("click", () => {
                    ResetCookie("LOGINKEY", loginKey);
                    ResetCookie("USERKEY", userKey);

                    $.ajax({
                        data: {"size": "14"},
                        type: "POST",
                        dataType: "JSON",
                        url: `https://novelpia.com/proc/viewer_data/${click}`,
                        cache: false,
                        success: (data) => {
                            let result = "";

                            for (const string of data["s"]) {
                                result += string["text"].replace(/&nbsp;/g, "");
                            }

                            alert(result);

                            ResetCookie("LOGINKEY", oldLoginKey);
                            ResetCookie("USERKEY", oldUserKey);
                        }
                    });
                });
        });
    });

    observer.observe(document.querySelector("#episode_list")!, {
        childList: true
    });
}