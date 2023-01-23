import {EP_List, FOOTER_BAR, HEADER_BAR} from "../util/Selectors";
import {commentLoaded} from "../util/CommentLoaded";
import $ from "jquery";

export default {
    config: {
        head: "레이아웃 설정",
        configs: {
            HideAd: {
                label: "광고 숨기기",
                type: "checkbox",
                default: false
            },
            HideEvent: {
                label: "이벤트 숨기기",
                type: "checkbox",
                default: false
            },
            HideRecommendEffect: {
                label: "추천 효과 숨기기",
                type: "checkbox",
                default: false
            },
            HideViewerThumbnail: {
                label: "뷰어 썸네일 숨기기",
                type: "checkbox",
                default: false
            },
            InfoUnfold: {
                label: "상세정보 항상 보기",
                type: "checkbox",
                default: false
            },
            NaviColor: {
                label: "뷰어 배경색으로 네비 색 변경",
                type: "checkbox",
                default: false
            },
            HidePlus: {
                label: "검색시 플러스 숨기기",
                type: "checkbox",
                default: false
            },
            HideNotice: {
                label: "공지 숨기기 버튼 추가",
                type: "checkbox",
                default: false
            },
            HideOnlyEmojiComment: {
                label: "노벨티콘만 있는 댓글 숨기기",
                type: "checkbox",
                default: false
            },
            HideOnlyEmojiComment_Remove: {
                label: "노벨티콘만 있는 댓글 완전히 숨기기",
                type: "checkbox",
                default: false
            },
            DisableNovelAlert: {
                label: "회차 클릭 알림 제거",
                type: "checkbox",
                default: false
            },
            BetterSideView: {
                label: "사이드뷰 개선",
                type: "checkbox",
                default: false
            }
        }
    },
    property: "start",
    start() {
        const hideAdEnable = GM_getValue<boolean>("HideAd", false);
        const hideEventEnable = GM_getValue<boolean>("HideEvent", false);
        const hideRecommendEffectEnable = GM_getValue<boolean>("HideRecommendEffect", false);
        const hideViewerThumbnailEnable = GM_getValue<boolean>("HideViewerThumbnail", false);
        const infoUnfoldEnable = GM_getValue<boolean>("InfoUnfold", false);
        const naviColorEnable = GM_getValue<boolean>("NaviColor", false);
        const hidePlusEnable = GM_getValue<boolean>("HidePlus", false);
        const hideNoticeEnable = GM_getValue<boolean>("HideNotice", false);
        const hideOnlyEmojiCommentEnable = GM_getValue<boolean>("HideOnlyEmojiComment", false);
        const hideOnlyEmojiCommentRemoveEnable = GM_getValue<boolean>("HideOnlyEmojiComment_Remove", false);
        const disableNovelAlertEnable = GM_getValue<boolean>("DisableNovelAlert", false);
        const betterSideViewEnable = GM_getValue<boolean>("BetterSideView", false);

        if (hideAdEnable) {
            if (/^\/mybook/.test(location.pathname))
                GM_addStyle(`img[alt="내서재 광고"] { display: none!important; }`);

            if (/^\/viewer\//.test(location.pathname)) {
                GM_addStyle(".ad_banner { display: none!important; }");
                GM_addStyle("img[alt=광고] { display: none!important; }");
            }

            if (!/^\/viewer\//.test(location.pathname))
                document.querySelector(`.am-sideleft img[alt="글 쓰고 부자되기"]`)?.closest("li")?.remove();

            if (/^\/ssul/.test(location.pathname))
                GM_addStyle(".story_bnr { display: none!important; }");

            if (/^\/comic/.test(location.pathname))
                GM_addStyle(".comic_bnr { display: none!important; }");

            if (/^\/novel/.test(location.pathname))
                GM_addStyle(".novel_banner { display: none!important; }");

            if (/^\/freestory|plus/.test(location.pathname))
                GM_addStyle(`img[alt="자유연재 광고"] { display: none!important; }`);

            if (/^\/plus/.test(location.pathname))
                GM_addStyle(".calc-event-wrapper { display: none!important; }");
        }

        if (hideEventEnable && /^(\/$|\/freestory)/.test(location.pathname)) {
            GM_addStyle(".swiper-container { display: none!important; }");
        }

        if (hideRecommendEffectEnable && /^\/viewer\//.test(location.pathname)) {
            GM_addStyle(".like_btn { display: none!important; }");
        }

        if (hideViewerThumbnailEnable && /^\/viewer\//.test(location.pathname)) {
            GM_addStyle(".cover-wrapper { display: none !important; }");
        }

        if (infoUnfoldEnable && /^\/novel\//.test(location.pathname)) {
            const moreInfoButton = document.querySelector("#more_info_btn") as HTMLElement;
            const moreInfo = document.querySelector(".more_info") as HTMLElement;

            if (moreInfoButton !== null && moreInfo !== null) {
                moreInfoButton.style.display = "none";
                moreInfo.style.display = "initial";
            }
        }

        if (naviColorEnable && /^\/viewer\//.test(location.pathname)) {
            unsafeWindow.viewer_display =
                new Proxy(unsafeWindow.viewer_display, {
                    apply(target, thisArg, argArray) {
                        Reflect.apply(target, thisArg, argArray);
                        changeTheme();
                    }
                });

            function changeTheme() {
                const color = (document.querySelector("#viewer_no_drag") as HTMLElement).style.backgroundColor;

                (document.querySelector(HEADER_BAR) as HTMLElement).style.backgroundColor = color;
                (document.querySelector(FOOTER_BAR) as HTMLElement).style.backgroundColor = color;
            }

            changeTheme();
        }

        if (hidePlusEnable && /^\/search\//.test(location.pathname)) {
            const plusCount = $(".b_plus").map((_, element) =>
                $(element).closest(`div[class=mobile_show]`).eq(0).remove()
            ).length;

            $(`span[style="font-size: 14px;font-weight: 600;"]`)
                .append(`<br><font style="color: #d23a3a;font-size: 12px;">(PLUS ${plusCount}개 차단)</font>`);
        }

        if (hideNoticeEnable && /^\/novel/.test(location.pathname)) {
            $(".notice_toggle_btn").on("click", () => $("#upNotice").show());

            $(".notice_table > tbody")
                .append(
                    $(`<tr class=notice_toggle_btn id=upNotice style="width:100%;text-align:center;font-weight:600;padding:15px;background-color:#feffe5;border-bottom:1px solid #f7f7f7;cursor:pointer;display:none"><td colspan=3 style="padding:10px 0">숨기기 <i class="icon ion-android-arrow-up"></i>`)
                        .on("click", function () {
                            for (const element of $(".notice_toggle_btn").show().nextAll()) {
                                const $element = $(element);

                                if ($element.hasClass("ep_style4"))
                                    $element.hide();
                            }

                            $(this).hide();
                        })
                );
        }

        if (hideOnlyEmojiCommentEnable && /^\/viewer\//.test(location.pathname)) {
            commentLoaded(() => {
                for (const element of $("#comment_load > div[class*=comment] > .comment_wrap > .comment_content > .comment_img")) {
                    const $element = $(element);

                    if (
                        $element.css("display") === "none" ||
                        $element.parent().children(".comment_text").text().length > 0 ||
                        $element.closest(".comment").attr("data-status") !== "1"
                    ) continue;

                    if (hideOnlyEmojiCommentRemoveEnable) {
                        $element.closest(".comment").remove();
                        continue;
                    }

                    $element
                        .closest(".comment")
                        .attr("data-status", "0");

                    const regDate = $element
                        .parent()
                        .children(".comment_regdate")
                        .nextAll();

                    regDate
                        .parent()
                        .append(`<span style="color: #999;">노벨티콘만 있는 댓글 입니다.</span><br>`);

                    regDate.remove();
                }
            });
        }

        if (disableNovelAlertEnable && /^\/novel\//.test(location.pathname)) {
            function disableNovelAlert() {
                for (const element of $(`${EP_List} > table > tbody > tr`)) {
                    const $element = $(element);

                    const $td = $element.children().eq(1);

                    if (!$td.attr("onclick")!.includes("modal_background"))
                        continue;

                    const attr = Array.from(
                        $element
                            .children()
                            .eq(0)
                            .children("div")
                            .get(0)
                            ?.attributes!
                    ).find(attr => attr.name.startsWith("novel_on_"))?.name;

                    if (!attr)
                        continue;

                    const url = /^novel_on_(\d*)"$/.exec(attr)?.[1];

                    if (!url) continue;

                    $td.attr("onclick", `$('.loads').show(); location ='/viewer/${url}'`);
                }
            }

            window.addEventListener("load", () => {
                setTimeout(() => {
                    disableNovelAlert();

                    const observer = new MutationObserver(disableNovelAlert);

                    observer.observe($(EP_List).get(0)!, {
                        childList: true
                    });
                }, 1000);
            });
        }

        if (betterSideViewEnable && !/^\/viewer\//.test(location.pathname)) {
            window.addEventListener("load", () => {
                const div = document.createElement("div");
                div.style.display = "none";
                div.style.position = "fixed";
                div.style.width = "100vw";
                div.style.height = "100vh";
                div.style.zIndex = "999";
                div.onclick = () => {
                    document.body.classList.remove("show-left");
                    div.style.display = "none";
                };

                document.body.prepend(div);

                document
                    .querySelector("span#naviconLeftMobile")!
                    .addEventListener("click", () =>
                        div.style.display = document.body.classList.contains("show-left") ? "initial" : "none"
                    );
            });
        }
    }
} as Module;