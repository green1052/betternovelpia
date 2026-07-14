import type {ReactNode} from "react";
import {isDarkMode} from "./IsDarkMode";
import sharedCSS from "../styles/ui.css" with {type: "text"};

const injected = new Set<string>();

export function injectCSS(css: string) {
    if (injected.has(css)) return;
    injected.add(css);
    GM_addStyle(css);
}

export function ThemedApp({children}: {children: ReactNode}) {
    injectCSS(sharedCSS);
    const theme = isDarkMode() ? "dark" : "light";
    return <div data-theme={theme} className="bn-root">{children}</div>;
}
