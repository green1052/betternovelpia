import React from "react";
import styled from "styled-components";

export function Header(props: { children: React.ReactNode, }) {
    const MainTd = styled.td`
      text-align: center;
      font-size: 25px;
      width: 63px;
      z-index: 10000;
    `;

    return (
        <MainTd>
            {props.children}
        </MainTd>
    );
}