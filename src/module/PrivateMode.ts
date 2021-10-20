import $ from "jquery";
import {viewerData} from "../util/ViewerData";
import {EP_List, NOTICE_LIST} from "../util/Selectors";

export default {
    url: /^\/novel\//,
    enable: ["PrivateMode"],
    start() {
        function makePrivate(jquery: JQuery<HTMLElement>) {
            const url = /'\/viewer\/(?<url>\d*)';$/.exec(jquery.attr("onclick")!)?.groups!["url"];

            if (!url)
                return;

            jquery
                .removeAttr("onclick")
                .on("click", () => {
                    const data = viewerData(url);

                    if (!data.length) {
                        alert("내용 없음");
                        return;
                    }

                    const content = data.map(str => str.text.replaceAll("&nbsp;", "")
                        .replaceAll("&amp;", "&")
                        .replaceAll("&lt;", "<")
                        .replaceAll("&gt;", ">")
                        .replaceAll("&#39;", "'")
                        .replaceAll("&quot;", `"`)
                    ).join("");

                    alert(content);
                });
        }

        for (const element of $(`${NOTICE_LIST} td:nth-child(2)`)) {
            makePrivate($(element));
        }

        const observer = new MutationObserver(() => {
            $(`${EP_List} > table > tbody > tr td:nth-child(2)`).attr("onclick", function () {
                makePrivate($(this));
            });
        });

        observer.observe($(EP_List).get(0)!, {
            childList: true
        });
    }
} as Module;