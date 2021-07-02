export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("NovelDownload") || !location.pathname.includes("/viewer/"))
        return;

    const query = document.querySelector("#header_bar > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1)");

    if (!query)
        return;

    const h9 = document.createElement("h9");
    h9.innerHTML = "복사";

    const td = document.createElement("td");
    td.style.textAlign = "center";
    td.style.fontStyle = "12px";
    td.style.width = "63px";
    td.style.zIndex = "10000";
    td.innerHTML = h9.outerHTML;
    td.onclick = () => {
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
    };

    query.insertBefore(td, query.children[6]);
}