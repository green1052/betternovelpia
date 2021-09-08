import $ from "jquery";

export default {start};

function start() {
    if (!GM_config.get("InfoUnfold") || !location.pathname.includes("/novel/"))
        return;

    $("#more_info_btn").hide();
    $(".more_info").show();

    $(document).unbind("keydown");
}