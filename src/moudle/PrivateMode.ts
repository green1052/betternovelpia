export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("PrivateMode") || !location.pathname.includes("/novel/"))
        return;

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
                    $.ajax({
                        data: {"size": "14"},
                        type: "POST",
                        dataType: "JSON",
                        url: `/proc/viewer_data/${click}`,
                        cache: false,
                        success: (data) => {
                            let result = "";

                            for (const string of data["s"])
                                result += string["text"];

                            result = result
                                .replace(/&nbsp;/g, "")
                                .replace(/&amp;/g, "&")
                                .replace(/&lt;/g, "<")
                                .replace(/&gt;/g, ">")
                                .replace(/&#39;/g, "'")
                                .replace(/&quot;/g, `"`);

                            alert(result);
                        }
                    });
                });
        });
    });

    observer.observe(document.querySelector("#episode_list")!, {
        childList: true
    });
}