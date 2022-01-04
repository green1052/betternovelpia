import $ from "jquery";
import {HEADER_BAR, NOVEL_DRAWING, NOVEL_EP, NOVEL_TITLE} from "../util/Selectors";
import {saveAs} from "file-saver";
import React, {useCallback} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

function NovelDownload() {
    const click = useCallback(() => {
        const novelText = $(NOVEL_DRAWING).text().replace(/다음화 보기|여기까지가 등록된 마지막 회차입니다/, "");

        if (GM_getValue("NovelDownload_Copy", false))
            GM_setClipboard(novelText);
        else {
            const blob = new Blob([novelText], {type: "text/plain;charset=utf-8"});
            saveAs(blob, `${$(NOVEL_EP).text() ?? "EP.알 수 없음"} - ${$(NOVEL_TITLE).text()}.txt`);
        }

        toastr.info("복사됐습니다.", "소설 다운로드");
    }, []);

    const MainTd = styled.td`
      text-align: center;
      font-size: 25px;
      width: 63px;
      z-index: 10000;
    `;

    return (
        <MainTd onClick={click}>
            <i className="icon ion-code-download"/>
        </MainTd>
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
            },
            NovelDownload_Copy: {
                label: "소설 내용 복사 (비활성화 시 파일로 저장됨)",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const appContainer = document.createElement("td");
        $(HEADER_BAR).children().eq(6).before(appContainer);
        ReactDOM.render(<NovelDownload/>, appContainer);
    }
} as Module;