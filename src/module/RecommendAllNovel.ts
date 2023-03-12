import $ from "cash-dom";
import {EP_List} from "../util/Selectors";
import {element} from "../util/Element";
import ky from "ky";

export default {
    include: /^\/novel\//,
    enable: ["RecommendAllNovel"],
    config: {
        head: "소설 일괄 추천/비추천",
        configs: {
            RecommendAllNovel: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        element(document.querySelector(EP_List), () => {
            const csrf = /"csrf": "(.*)"/.exec(unsafeWindow.alarm_btn.toString())?.[1];

            if (!csrf) return;

            const lastPageString = $(".page-link:last").attr("onclick");

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
                    const $response = $(
                        await ky.post("/proc/episode_list", {
                            body: new URLSearchParams({
                                novel_no: String(novelNumber),
                                sort: localStorage[`novel_sort_${novelNumber}`],
                                page: String(i)
                            })
                        }).text()
                    );

                    for (const element of $response.find("tr > td:nth-child(2)")) {
                        const url = /\/viewer\/(\d*)'$/.exec($(element).attr("onclick")!)?.[1];

                        if (url)
                            await recommend(url, on);
                    }
                }

                unsafeWindow.toastr.info("완료", "소설 일괄 추천/비추천");
            };

            const center = document.querySelector(`ul[style=""][class=mobile_center]`)!;

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
} as Module;
