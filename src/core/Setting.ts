import $ from "jquery";
import {SIDE_LEFT} from "../util/Selectors";

export default {start};

function start() {
    if (location.pathname.includes("/viewer/"))
        return;

    $(SIDE_LEFT)
        .append(
            $(`<li><a><img style="margin-left: -5px; height: 25px;" src="//novelpia.com/img/new/viewer/btn_theme.png"></a></li>`)
                .css("padding", "10px 25px")
                .on("click", () => GM_config.open())
        );
}