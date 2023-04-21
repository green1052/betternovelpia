import $ from "cash-dom";
import {SIDE_LEFT} from "./Selectors";

let isFirst = true;

export function appendSide(icon: string, title: string, onclick: () => void | Promise<void>) {
    const $Code =
        $(`<li class="new-list-style"><span style=width:20px;display:inline-block;text-align:center><i class="icon ${icon}"></i></span>${title}</li>`).on("click", onclick);

    const $Logout = $(`.am-sideleft span[onclick*="/proc/logout"]`);

    if (!$Logout.length) {
        const $SideLeft = $(SIDE_LEFT);

        if (isFirst) {
            isFirst = false;
            $SideLeft.append(`<hr class="category-line">`);
        }

        $SideLeft.append($Code);
        return;
    }

    if (isFirst) {
        isFirst = false;
        $(`<hr class="category-line">`).insertBefore($Logout.parent());
    }

    $Code.insertBefore($Logout.parent());
}
