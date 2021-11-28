import $ from "jquery";
import {EP_List} from "../util/Selectors";

export default {
    url: /^\/novel\//,
    enable: ["DisableNovelAlert"],
    config: {
        head: "회차 클릭 알림 제거",
        configs: {
            DisableNovelAlert: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        if (!$(".b_plus").length) return;

        function disableNovelAlert() {
            for (const element of $(`${EP_List} > table > tbody > tr`)) {
                const $element = $(element);

                const $td = $element.children().eq(1);

                if (!$td.attr("onclick")!.includes("modal_background"))
                    continue;

                const attr = Array.from(
                    $element
                        .children()
                        .eq(0)
                        .children("div")
                        .get(0)
                        ?.attributes!
                ).find(attr => attr.name.startsWith("novel_on_"))?.name;

                if (!attr)
                    continue;

                const url = /^novel_on_(\d*)"$/.exec(attr)?.[1];

                if (!url) continue;

                $td.attr("onclick", `$('.loads').show(); location ='/viewer/${url}'`);
            }
        }

        disableNovelAlert();

        const observer = new MutationObserver(disableNovelAlert);

        observer.observe($(EP_List).get(0)!, {
            childList: true
        });
    }
} as Module;