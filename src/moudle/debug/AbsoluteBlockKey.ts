import Config from "../../Config";

export default {Start};

function Start() {
    if (!Config.GetConfig("AbsoluteBlockKey"))
        return;

    $(`script:contains("/* F12 */")`).remove();
    document.onmousedown = null;

    if (!location.pathname.includes("/viewer/"))
        return;

    document.body.attributes.removeNamedItem("ondragstart");
    document.body.attributes.removeNamedItem("onselectstart");
    document.body.attributes.removeNamedItem("oncontextmenu");

    // @ts-ignore
    clearInterval(playAlert);

    const style = document.createElement("style");
    style.innerHTML = ".no-drag{-ms-user-select:unset!important;-moz-user-select:unset!important;-webkit-user-select:unset!important;-khtml-user-select:unset!important;user-select:unset!important}";

    document.body.append(style);
}