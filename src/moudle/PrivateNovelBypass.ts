export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("PrivateNovelBypass") || !location.pathname.includes("/viewer/"))
        return;

    const locked = $(".ion-locked").parent();

    if (!locked.text().includes("아직 공개되지 않은 소설입니다."))
        return;

    $.ajax({
        data: {"size": "14"},
        type: "POST",
        dataType: "JSON",
        url: `/proc/viewer_data/${location.pathname.substring(8)}`,
        cache: false,
        success: (data) => {
            const json_m: { text: string, size: number, align: string }[] = [];

            for (const string of data["s"]) {
                const json_t = {
                    text: string["text"],
                    size: 11,
                    align: "left"
                };

                json_m.push(json_t);
            }

            novel_data = json_m;

            locked
                .parent()
                .append(`<ol id="novel_drawing" class="no-drag np" onclick="navi_view();" style="padding:0px;margin:0px;">`);

            locked.remove();

            data_load = 1;
            novel_drawing(novel_data);

            const next = $(`img[src*="btn_next.png"]`)
                .parent()
                .attr("onclick");

            if (next)
                $("#novel_drawing")
                    .append(`<div id="next_epi_btn_bottom" style="background-color: rgba(155, 155, 155, 0.1); border: 1px solid rgba(155, 155, 155, 0.2); border-radius: 10px; padding: 10px 20px; text-align: center; margin: 100px 0px; cursor: pointer;" onclick="${next}">다음화 보기</div>`);
            else
                $("#novel_drawing")
                    .append(`<div style="background-color: rgba(155,155,155,0.1); border: 1px solid  rgba(155,155,155,0.2); border-radius: 10px; padding: 10px 20px;margin-top:10px;text-align:center;margin-top:100px;">여기까지가 등록된 마지막 회차입니다</div>`);
        }
    });
}