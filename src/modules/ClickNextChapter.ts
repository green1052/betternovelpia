import {NOVEL_BOX} from "../util/Selectors";
import {defineModule} from "../util/config";

export default defineModule({
    include: /^\/viewer\//,
    config: {
        head: "클릭으로 다음 회차",
        configs: {
            ClickNextChapter: {label: "(0 ~ 5)", type: "int", min: 0, max: 5, default: 0}
        }
    },
    start({ClickNextChapter}) {
        if (ClickNextChapter !== 0)
            document.querySelector(NOVEL_BOX)?.addEventListener("click", (ev: Event) => {
                if ((ev as CustomEvent).detail === ClickNextChapter)
                    document.querySelector<HTMLElement>(".menu-next-item")?.click();
            });
    }
});
