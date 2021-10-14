import $ from "jquery";
import {SIDE_LEFT} from "../../util/Selectors";

export default {
    enable: ["Eval"],
    start() {
        if (!/^\/viewer\//.test(location.pathname))
            $(SIDE_LEFT).append(
                $(`<li style="padding: 10px 25px;"><h5>eval</h5></li>`)
                    .on("click", () => {
                        const code = prompt("code: ");

                        if (!code)
                            return;

                        try {
                            alert(`결과:\n${eval(code)}`);
                        } catch (e) {
                            alert(`오류:\n${e}`);
                        }
                    })
            );
    }
} as Module;