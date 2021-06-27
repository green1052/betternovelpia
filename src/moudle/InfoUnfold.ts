export default {Start};
import Config from "../Config";

function Start() {
    if (!Config.GetConfig("InfoUnfold") || !location.pathname.includes("/novel/"))
        return;

    $("#more_info_btn").hide();
    $(".more_info").show();
}