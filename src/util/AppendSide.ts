import $ from "jquery";
import {SIDE_LEFT} from "./Selectors";

let isFirst = true;

export function appendSide(icon: string, title: string, onclick: () => void | Promise<void>) {
    const $Code = $(`<li style="padding:10px 25px"><span style=width:20px;display:inline-block;text-align:center><i class="icon ${icon}"></i></span>${title}</li>`).on("click", onclick);

    const $Logout = $(`span[onclick*="/proc/logout"]`);

    if (!$Logout.length) {
        const $SideLeft = $(SIDE_LEFT);

        if (isFirst) {
            isFirst = false;
            $SideLeft.append(`<hr style="margin:3px 0">`);
        }

        $SideLeft.append($Code);
        return;
    }

    if (isFirst) {
        isFirst = false;
        $(`<hr style="margin:3px 0">`).insertBefore($Logout.parent());
    }

    $Code.insertBefore($Logout.parent());
}