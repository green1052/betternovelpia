import $ from "jquery";
import {SIDE_LEFT} from "../../util/Selectors";

export default {
    enable: ["Eval"],
    start() {
        if (/\/viewer\//.test(location.href))
            return;

        const li = $("<li>")
            .css("padding", "10px 25px")
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
            .append("<h5>eval</h5>");

        $(SIDE_LEFT).append(li);
    }
} as Module;