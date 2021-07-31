export default {Start};
import $ from "jquery";

function Start() {
    if (!GM_config.get("InfoUnfold") || !location.pathname.includes("/novel/"))
        return;

    $("#more_info_btn").hide();
    $(".more_info").show();
}