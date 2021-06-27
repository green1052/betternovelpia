import Config from "../Config";

export default {Start};

function Start() {
    if (!Config.GetConfig("HideEvent") || location.pathname.includes("/viewer/"))
        return;

    const event = $(`span:contains("방금전까지")`).parent();
    event.removeAttr("onclick");

    event.css("background-color", "");
    event.css("padding", "");

    event.empty();

    document.querySelectorAll("#slider-wrap").forEach(query => {
        query.remove();
    });
}