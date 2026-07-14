import {SIDE_LEFT} from "./Selectors";

let isFirst = true;
let sideMenu: HTMLElement | null = null;

export function appendSide(title: string, onclick: () => void | Promise<void>) {
    const code = document.createElement("p");
    code.textContent = title;
    code.addEventListener("click", onclick);

    if (isFirst) {
        isFirst = false;
        const sideMenuService = document.createElement("div");
        sideMenuService.className = "sidemenu-service";
        sideMenuService.innerHTML = `<p class="sidemenu-link-title">BetterNovelpia</p><div class="sidemenu-link-grid"></div>`;

        document.querySelector(SIDE_LEFT)?.after(sideMenuService);
        sideMenu = sideMenuService;
    }

    sideMenu?.querySelector(".sidemenu-link-grid")?.appendChild(code);
}
