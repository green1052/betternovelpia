import $ from "jquery";
import {SIDE_LEFT} from "../util/Selectors";

export default {
    start() {
        if (!/^\/viewer\//.test(location.pathname))
            $(SIDE_LEFT).append(
                $(`<li style="padding: 10px 25px;"><img style="margin-left: -5px; height: 25px;" src="//novelpia.com/img/new/viewer/btn_theme.png"></li>`)
                    .on("click", () => GM_config.open())
            );
    }
} as Module;