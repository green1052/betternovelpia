import $ from "jquery";

export default {
    url: /^\/novel\//,
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
                $(`<tr id="upNotice" class="notice_toggle_btn" style="width: 100%; text-align: center; font-weight: 600; padding: 15px; background-color: rgb(254, 255, 229); border-bottom: 1px solid rgb(247, 247, 247); cursor: pointer; display: none;"><td colspan="3" style="padding: 10px 0;">숨기기 <i class="icon ion-android-arrow-up"></i></td></tr>`)
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