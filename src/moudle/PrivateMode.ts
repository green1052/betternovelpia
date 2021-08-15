import $ from "jquery";
import {waitElement} from "../util/WaitElement";
import {NOVEL_EP_LIST} from "../util/Selectors";
import {viewerData} from "../util/ViewerData";

export default {start};

function start() {
    if (!GM_config.get("PrivateMode") || !location.pathname.includes("/novel/"))
        return;

    waitElement($("#episode_list").get(0), () => {
        $(NOVEL_EP_LIST).each((index, element) => {
            const td = $(element).children().eq(1);

            const onclick = td.attr("onclick");

            if (!onclick)
                return;

            const click = onclick.substring(39, onclick.length - 2);

            td
                .removeAttr("onclick")
                .on("click", () => {
                    const data = viewerData(click);
                    let content = "";

                    for (const str of data) {
                        content += str.text.replace(/&nbsp;/g, "")
                            .replace(/&amp;/g, "&")
                            .replace(/&lt;/g, "<")
                            .replace(/&gt;/g, ">")
                            .replace(/&#39;/g, "'")
                            .replace(/&quot;/g, `"`);
                    }

                    alert(content);
                });
        });
    });
}