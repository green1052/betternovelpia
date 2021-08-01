export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("Eval") || location.pathname.includes("/viewer/"))
        return;

    const h5 = $("<h5>eval</h5>");

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
        .append(h5);

    $(".am-sideleft > div:nth-child(1) > ul:nth-child(1)").append(li);
}