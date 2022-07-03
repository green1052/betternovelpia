import $ from "jquery";
import {HEADER_BAR, NOVEL_DRAWING} from "../util/Selectors";
import React, {useCallback} from "react";
import {Header} from "../util/ApeendHeader";
import ReactDOM from "react-dom";

function NovelDownload() {
    const click = useCallback(() => {
        const novelText = $(NOVEL_DRAWING).text().replace(/다음화 보기|여기까지가 등록된 마지막 회차입니다/, "");

        GM_setClipboard(novelText);
        unsafeWindow.toastr.info("복사됐습니다.", "소설 다운로드");
    }, []);

    return (
        <Header>
            <i className="icon ion-code-download" onClick={click}/>
        </Header>
    );
}

export default {
    include: /^\/viewer\//,
    enable: ["NovelDownload"],
    config: {
        head: "소설 복사 사용",
        configs: {
            NovelDownload: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const appContainer = document.createElement("td");
        appContainer.style.width = "63px";
        $(HEADER_BAR).children().eq(6).before(appContainer);
        ReactDOM.render(<NovelDownload/>, appContainer);
    }
} as Module;