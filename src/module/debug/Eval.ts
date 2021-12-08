import $ from "jquery";
import {appendSide} from "../../util/AppendSide";

export default {
    exclude: /^\/viewer\//,
    enable: ["Eval"],
    config: {
        head: "eval 사용",
        configs: {
            Eval: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        appendSide(
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