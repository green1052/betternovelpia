import React, {useCallback, useEffect, useState} from "react";
import styled, {css} from "styled-components";
import {createRoot} from 'react-dom/client';

function BetterSideView() {
    const [hide, setHide] = useState(true);

    useEffect(() => {
        document.querySelector("span#naviconLeftMobile")?.addEventListener("click", () =>
            setHide(!document.body.classList.contains("show-left"))
        );
    }, []);

    const click = useCallback(() => {
        document.body.classList.remove("show-left");
        setHide(true);
    }, []);

    const MainDiv = styled.div`
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 999;
      ${hide && css`display: none;`};
    `;

    return <MainDiv onClick={click}/>;
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

        const root = createRoot(appContainer);
        root.render(<BetterSideView/>,);
    }
} as Module;