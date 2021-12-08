import $ from "jquery";

export default {
    include: /^\/search\//,
    enable: ["HidePlus"],
    config: {
        head: "검색시 플러스 숨기기",
        configs: {
            HidePlus: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        let plusCount = 0;

        for (const element of $(".b_plus")) {
            const $element = $(element).parent().parent().parent().parent().parent();

            if (!$element.hasClass("mobile_show"))
                continue;

            $element.remove();
            plusCount++;
        }

        $(`span[style="font-size: 14px;font-weight: 600;"]`)
            .append(`<br><font style="color: #d23a3a;font-size: 12px;">(PLUS ${plusCount}개 차단)</font>`);
    }
} as Module;