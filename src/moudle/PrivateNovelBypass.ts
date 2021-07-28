export default {Start};

function Start() {
    if (!GM_config.get("PrivateNovelBypass") || !location.pathname.includes("/viewer/"))
        return;

    const locked = $(".ion-locked");

    if (!locked.length)
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
                const json_t: { text: string, size: number, align: string } = {
                    text: string["text"],
                    size: 11,
                    align: "left"
                };

                json_m.push(json_t);
            }

            novel_data = json_m;

            locked
                .parent()
                .parent()
                .append(`<ol id="novel_drawing" class="no-drag np" onclick="navi_view();" style="padding:0px;margin:0px;">`);

            locked.parent().remove();

            setTimeout(() => {
                data_load = 1;
                novel_drawing(novel_data);
            }, 10);
        }
    });
}