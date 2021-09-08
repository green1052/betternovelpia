import $ from "jquery";
import {SIDE_LEFT} from "../util/Selectors";

export default {start};

function start() {
    if (location.pathname.includes("/viewer/"))
        return;

    const img = $(`<img src="//novelpia.com/img/new/viewer/btn_theme.png" alt="">`)
        .css("margin-left", "-5px")
        .css("height", 25);

    const a = $("<a>")
        .append(img);

    const li = $("<li>")
        .css("padding", "10px 25px")
        .on("click", () => GM_config.open())
        .append(a);

    $(SIDE_LEFT).append(li);
}