export default {start};

function start() {
    if (!GM_config.get("PreLoadComment") || !location.pathname.includes("/viewer/"))
        return;

    comment_load();
}