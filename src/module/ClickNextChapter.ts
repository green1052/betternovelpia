import {NOVEL_BOX} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    config: {
        head: "클릭으로 다음 회차",
        configs: {
            ClickNextChapter: {
                label: "(0 ~ 5)",
                type: "int",
                min: 0,
                max: 5,
                default: 0
            }
        }
    },
    start() {
        const clickNextChapter = GM_getValue<number>("ClickNextChapter", 0);

        if (clickNextChapter !== 0)
            document.querySelector(NOVEL_BOX)?.addEventListener("click", (ev: Event) => {
                if ((ev as CustomEvent).detail === clickNextChapter)
                    document.querySelector<HTMLElement>(".menu-next-item")?.click();
            });
    }
} as Module;