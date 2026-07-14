import {EP_LIST} from "../util/Selectors";
import {waitElement} from "../util/WaitElement";
import {defineModule} from "../util/config";
import ky from "ky";

export default defineModule({
    include: /^\/novel\//,
    enable: ["RecommendAllNovel"],
    config: {
        head: "소설 일괄 추천/비추천",
        configs: {
            RecommendAllNovel: {label: "활성화", type: "checkbox", default: false}
        }
    },
    start() {
        waitElement(document.querySelector(EP_LIST), () => {
            const csrf = /"csrf": "(.*)"/.exec(unsafeWindow.alarm_btn.toString())?.[1];

            if (!csrf) return;

            const pageLinks = document.querySelectorAll(".page-link");
            const lastPageLink = pageLinks[pageLinks.length - 1] as HTMLElement | undefined;
            const lastPageString = lastPageLink?.getAttribute("onclick") ?? null;

            if (!lastPageString) return;

            const novelNumber = Number(/'novel_page_(\d*)'/.exec(lastPageString)?.[1]);

            if (isNaN(novelNumber)) return;

            const lastPage = Number(/= '(\d*)';/.exec(lastPageString)?.[1]);

            if (isNaN(lastPage)) return;

            const recommend = async (url: string, on: boolean) => {
                const response = await ky.post("/proc/board_option", {
                    body: new URLSearchParams({
                        option: "vote_novel",
                        value: url,
                        csrf: csrf
                    })
                }).text();

                if (on && response.startsWith("off")) {
                    await recommend(url, true);
                } else if (!on && response.startsWith("on")) {
                    await recommend(url, false);
                }
            };

            const recommendList = async (on: boolean) => {
                unsafeWindow.toastr.info("진행 중...", "소설 일괄 추천/비추천");

                for (let i = 0; i <= lastPage; i++) {
                    const responseHtml = await ky.post("/proc/episode_list", {
                        body: new URLSearchParams({
                            novel_no: String(novelNumber),
                            sort: localStorage[`novel_sort_${novelNumber}`],
                            page: String(i)
                        })
                    }).text();

                    const wrapper = document.createElement("div");
                    wrapper.innerHTML = responseHtml;

                    for (const el of wrapper.querySelectorAll("tr > td:nth-child(2)")) {
                        const url = /\/viewer\/(\d*)'$/.exec(el.getAttribute("onclick") ?? "")?.[1];

                        if (url)
                            await recommend(url, on);
                    }
                }

                unsafeWindow.toastr.info("완료", "소설 일괄 추천/비추천");
            };

            const center = document.querySelector('ul[style=""][class=mobile_center]');

            if (!center) return;

            const upvote = document.createElement("li");
            upvote.innerHTML = `<button>일괄 추천</button>`;
            upvote.addEventListener("click", () => recommendList(true));

            const downvote = document.createElement("li");
            downvote.innerHTML = `<button>일괄 비추천</button>`;
            downvote.addEventListener("click", () => recommendList(false));

            center.appendChild(downvote);
            center.appendChild(upvote);
        });
    }
});
