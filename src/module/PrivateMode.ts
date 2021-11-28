import $ from "jquery";
import {viewerData} from "../util/ViewerData";
import {EP_List, NOTICE_LIST} from "../util/Selectors";
import {decode} from "html-entities";
import toastr from "toastr";

export default {
    url: /^\/novel\//,
    enable: ["PrivateMode"],
    config: {
        head: "프라이빗 모드",
        configs: {
            PrivateMode: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        function makePrivate(jquery: JQuery<HTMLElement>) {
            const url = /'\/viewer\/(\d*)'/.exec(jquery.attr("onclick")!)?.[1];

            if (!url)
                return;

            jquery
                .removeAttr("onclick")
                .on("click", () => {
                    const data = viewerData(url);

                    if (!data.length) {
                        toastr.options = {
                            escapeHtml: true,
                            closeButton: true,
                            newestOnTop: false,
                            progressBar: true
                        };

                        toastr.info("내용 없음", "프라이빗 모드");

                        return;
                    }

                    alert(...data.map(str => decode(str.text)));
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