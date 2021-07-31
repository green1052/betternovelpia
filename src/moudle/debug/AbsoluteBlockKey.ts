export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("AbsoluteBlockKey"))
        return;

    $(`script:contains("/* F12 */")`).remove();
    document.onmousedown = null;

    if (!location.pathname.includes("/viewer/"))
        return;

    ["ondragstart", "onselectstart", "oncontextmenu"].forEach(attr => {
        $(document.body).removeAttr(attr);
    });

    clearInterval(playAlert);

    const style = $(`<style>
        .no-drag { 
            -ms-user-select:unset !important;
            -moz-user-select:unset !important;
            -webkit-user-select:unset !important;
            -khtml-user-select:unset !important;
            user-select:unset !important
        }
    </style>`);

    $(document.body).append(style);
}