export default {Start};

function Start() {
    if (location.pathname.includes("/viewer/"))
        return;

    const img = $(`<img src="https://novelpia.com/img/new/viewer/btn_theme.png">`)
        .css("margin-left", "-5px")
        .css("height", 25);

    const a = $("<a>")
        .append(img);

    const li = $("<li>")
        .css("padding", "10px 25px")
        .on("click", () => {
            GM_config.open();
        })
        .append(a);

    $(".am-sideleft > div:nth-child(1) > ul:nth-child(1)").append(li);
}