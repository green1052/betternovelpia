import $ from "jquery";
import {viewerData} from "../util/ViewerData";

export default {
    url: /^\/novel\//,
    enable: ["PrivateMode"],
    start() {
        const observer = new MutationObserver(() => {
            $("#episode_list > table > tbody > tr td:nth-child(2)").attr("onclick", function (index, value) {
                const url = value.substring(39, value.length - 2);

                $(this)
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
            });
        });

        observer.observe($("#episode_list").get(0), {
            childList: true
        });
    }
} as Module;