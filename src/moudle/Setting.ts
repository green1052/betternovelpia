export default {Start};

function Start() {
    if (location.pathname.includes("/viewer/"))
        return;

    const img = $(`<img src="https://novelpia.com/img/new/viewer/btn_theme.png">`);
    img.css("margin-left", "-5px");
    img.css("height", 25);

    const a = $("<a>");
    a.append(img);

    const li = $("<li>");
    li.css("padding", "10px 25px");
    li.append(a);

    li.on("click", () => {
        // @ts-ignore
        GM_config.open();
    });

    $(".am-sideleft > div:nth-child(1) > ul:nth-child(1)").append(li);
}