export default {Start};

function Start() {
    if (location.pathname.includes("/viewer/"))
        return;

    const img = document.createElement("img");
    img.src = "https://novelpia.com/img/new/viewer/btn_theme.png";
    img.style.cssText = "margin-left: -5px;";
    img.height = 25;

    const a = document.createElement("a");
    a.innerHTML = img.outerHTML;

    const li = document.createElement("li");
    li.style.cssText = "padding: 10px 25px;";
    li.innerHTML = a.outerHTML;
    li.onclick = () => {
        // @ts-ignore
        GM_config.open();
    };

    document.querySelector(".am-sideleft > div:nth-child(1) > ul:nth-child(1)")?.appendChild(li);
}