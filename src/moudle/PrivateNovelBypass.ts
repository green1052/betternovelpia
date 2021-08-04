import $ from "jquery";
import {fakeViewer} from "../util/FakeViewer";

export default {start};

function start() {
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

            fakeViewer(locked, json_m);
        }
    });
}