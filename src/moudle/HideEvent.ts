import Config from "../Config";

export default {Start};

function Start() {
    if (!Config.GetConfig("HideEvent") || location.pathname.includes("/viewer/"))
        return;

    $("#slider-wrap[class*=mobile_show]").remove();

    const event = $(`span:contains("현재까지")`).parent();
    event.removeAttr("onclick");
    event.css("background-color", "");
    event.css("padding", "");
    event.empty();
}