import $ from "jquery";
import {viewerData} from "../util/ViewerData";

export default {
    url: /\/novel\//,
    enable: ["PrivateMode"],
    start() {
        const observer = new MutationObserver(() => {
            $("#episode_list > table > tbody > tr td:nth-child(2)").attr("onclick", function (index, value) {
                const url = value.substring(39, value.length - 2);

                $(this)
                    .removeAttr("onclick")
                    .on("click", () => {
                        const data = viewerData(url);

                        if (!data.length)
                            return alert("내용 없음");

                        let content = "";

                        for (const str of data) {
                            content += str.text
                                .replace(/&nbsp;/g, "")
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

        observer.observe($("#episode_list").get(0), {
            childList: true
        });
    }
} as Module;
