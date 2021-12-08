import Cookies from "js-cookie";

export function isDarkMode() {
    return Cookies.get("DARKMODE") === "1";
}