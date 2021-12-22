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
        appendSide("ion-settings", "eval", () => {
            const code = prompt("code: ");

            if (!code)
                return;

            try {
                alert(`결과:\n${eval(code)}`);
            } catch (e) {
                alert(`오류:\n${e}`);
            }
        });
    }
} as Module;