import $ from "jquery";
import {fakeViewer} from "../util/FakeViewer";
import {LOCKED} from "../util/Selectors";
import {viewerData} from "../util/ViewerData";

export default {start};

function start() {
    if (!GM_config.get("PrivateNovelBypass") || !location.pathname.includes("/viewer/"))
        return;

    const locked = $(LOCKED).parent();

    if (locked.text().includes("아직 공개되지 않은 소설입니다."))
        fakeViewer(locked, viewerData(location.pathname.substring(8)));
}