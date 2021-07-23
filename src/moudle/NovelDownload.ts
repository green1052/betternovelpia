export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("NovelDownload") || !location.pathname.includes("/viewer/"))
        return;

    const query = $("#header_bar > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1)");

    if (!query.length)
        return;

    const td = $("<td>");
    td.css("text-align", "center");
    td.css("font-style", "12px");
    td.css("width", "63px");
    td.css("z-index", 10000);
    td.append("<h9>복사</h9>");
    td.on("click", () => {
        const textarea = document.createElement("textarea");
        textarea.value = document.querySelector("#novel_drawing")?.textContent ?? "오류";
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        alert("복사됐습니다.");
    });

    query.children().eq(6).before(td);
}