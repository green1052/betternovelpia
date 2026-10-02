import {SIDE_LEFT} from "./site";

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

export function waitElement(element: HTMLElement | null, code: () => void | Promise<void>, timeout = 5000) {
    if (!element) return;

    if (element.childNodes.length > 0) {
        code();
        return;
    }

    const observer = new MutationObserver(() => {
        if (element.childNodes.length > 0) {
            observer.disconnect();
            code();
        }
    });

    observer.observe(element, {childList: true, subtree: true});

    setTimeout(() => observer.disconnect(), timeout);
}
