import type {ReactNode} from "preact/compat";
import {isDarkMode} from "./IsDarkMode";
import "../styles/ui.css";

export function ThemedApp({children}: { children: ReactNode }) {
    const theme = isDarkMode() ? "dark" : "light";
    return <div data-theme={theme} className="bn-root">{children}</div>;
}
