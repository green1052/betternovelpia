import $ from "jquery";

export default {
    include: /^\/novel\//,
    enable: ["HideNotice"],
    config: {
        head: "공지 숨기기 버튼 추가",
        configs: {
            HideNotice: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        $(".notice_toggle_btn").on("click", () => $("#upNotice").show());

        $(".notice_table > tbody")
            .append(
                $(`<tr class=notice_toggle_btn id=upNotice style="width:100%;text-align:center;font-weight:600;padding:15px;background-color:#feffe5;border-bottom:1px solid #f7f7f7;cursor:pointer;display:none"><td colspan=3 style="padding:10px 0">숨기기 <i class="icon ion-android-arrow-up"></i>`)
                    .on("click", function () {
                        for (const element of $(".notice_toggle_btn").show().nextAll()) {
                            const $element = $(element);

                            if ($element.hasClass("ep_style4"))
                                $element.hide();
                        }

                        $(this).hide();
                    })
            );
    }
} as Module;