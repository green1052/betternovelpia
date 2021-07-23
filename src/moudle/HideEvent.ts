import Config from "../Config";

export default {Start};

function Start() {
    if (!Config.GetConfig("HideEvent"))
        return;

    if (location.pathname === "/")
        return $("#slider-wrap[class*=mobile_show]").remove();

    if (location.pathname === "/freestory") {
        const freeParent = $(`img[src*="banner_freestory1_mob.png"]`).parent().parent();

        freeParent.removeAttr("class");
        freeParent.removeAttr("style");
        freeParent.css("margin", "15px");
        freeParent.empty();
    }

    if (location.pathname === "/plus") {
        const plus = $(`img[src*="plus_banner5.png"]`);
        const plusParent = plus.parent();

        plus.remove();

        plusParent.removeAttr("class");
        plusParent.removeAttr("style");
        plusParent.css("margin", "15px");
    }

    $(`span:contains("현재까지")`).parent().remove();

    // const event = $(`span:contains("현재까지")`).parent();
    // event.removeAttr("onclick");
    // event.css("background-color", "");
    // event.css("padding", "");
    // event.empty();
}