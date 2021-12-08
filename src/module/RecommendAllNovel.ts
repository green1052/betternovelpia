import $ from "jquery";
import {EP_List} from "../util/Selectors";
import {element} from "../util/Element";
import toastr from "toastr";

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
        element($(EP_List), () => {
            const csrf = /"csrf": "(.*)"/.exec(unsafeWindow.alarm_btn.toString())?.[1];

            if (!csrf) return;

            const lastPageString = $(".page-link:last").attr("onclick");

            if (!lastPageString) return;

            const novelNumber = Number(/'novel_page_(\d*)'/.exec(lastPageString)?.[1]);

            if (isNaN(novelNumber)) return;

            const lastPage = Number(/= '(\d*)';/.exec(lastPageString)?.[1]);

            if (isNaN(lastPage)) return;

            const recommend = async (url: string, on: boolean) => {
                const response = await (await fetch("/proc/board_option", {
                    method: "POST",
                    cache: "no-cache",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        option: "vote_novel",
                        value: url,
                        csrf: csrf
                    })
                })).text();

                if (on && response.startsWith("off")) {
                    await recommend(url, true);
                } else if (!on && response.startsWith("on")) {
                    await recommend(url, false);
                }
            };

            const recommendList = async (on: boolean) => {
                toastr.info("진행 중...", "소설 일괄 추천/비추천");

                for (let i = 0; i <= lastPage; i++) {
                    const $response = $(await (await fetch("/proc/episode_list", {
                        method: "POST",
                        cache: "no-cache",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            novel_no: String(novelNumber),
                            sort: localStorage[`novel_sort_${novelNumber}`],
                            page: String(i)
                        })
                    })).text());

                    for (const element of $response.find("tr > td:nth-child(2)")) {
                        const url = /\/viewer\/(\d*)'$/.exec($(element).attr("onclick")!)?.[1];

                        if (url)
                            await recommend(url, on);
                    }
                }

                toastr.info("완료", "소설 일괄 추천/비추천");
            };

            $(`ul[style=""][class="mobile_center"]`)
                .prepend(
                    $("<li><button>일괄 비추천</button></li>")
                        .on("click", () => recommendList(false))
                )
                .prepend(
                    $("<li><button>일괄 추천</button></li>")
                        .on("click", () => recommendList(true))
                );
        });
    }
} as Module;