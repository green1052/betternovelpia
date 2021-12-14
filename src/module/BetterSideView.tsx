import $ from "jquery";
import React, {useCallback, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import styled, {css} from "styled-components";

function BetterSideView() {
    const [hide, setHide] = useState(true);

    useEffect(() => {
        $("span#naviconLeftMobile").on("click", () =>
            setHide(!$(document.body).hasClass("show-left"))
        );
    }, []);

    const MainDiv = styled.div`
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 999;
      ${hide && css`display: none;`};
    `;

    const click = useCallback(() => {
        $(document.body).removeClass("show-left");
        setHide(true);
    }, []);

    return <MainDiv onClick={() => click()}/>;
}

export default {
    exclude: /^\/viewer\//,
    enable: ["BetterSideView"],
    config: {
        head: "사이드뷰 개선",
        configs: {
            BetterSideView: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const appContainer = document.createElement("div");
        document.body.prepend(appContainer);
        ReactDOM.render(<BetterSideView/>, appContainer);
    }
} as Module;