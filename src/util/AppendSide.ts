import $ from "cash-dom";
import {SIDE_LEFT} from "./Selectors";
import {Cash} from "cash-dom/dist/cash";

let isFirst = true;
let $SideMenu: Cash;

export function appendSide(title: string, onclick: () => void | Promise<void>) {
    const $Code = $(`<p>${title}</p>`).on("click", onclick);

    if (isFirst) {
        isFirst = false;
        $SideMenu = $("<div class=sidemenu-service><p class=sidemenu-link-title>BetterNovelpia<div class=sidemenu-link-grid></div></div>").insertAfter(SIDE_LEFT);
    }

    $SideMenu.find(".sidemenu-link-grid").append($Code);
}
