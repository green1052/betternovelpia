import type {ReactNode} from "preact/compat";
import Cookies from "js-cookie";
import "../styles/ui.css";

export function ThemedApp({children}: { children: ReactNode }) {
    const theme = Cookies.get("DARKMODE") === "1" ? "dark" : "light";
    return <div data-theme={theme} className="bn-root">{children}</div>;
}
