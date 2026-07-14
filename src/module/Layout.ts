import {EP_LIST, FOOTER_BAR, HEADER_BAR} from "../util/Selectors";
import {commentLoaded} from "../util/CommentLoaded";
import {defineModule} from "../util/config";

let viewerDisplayHooked = false;

export default defineModule({
    config: {
        head: "레이아웃 설정",
        configs: {
            HideAd: {label: "광고 숨기기", type: "checkbox", default: false},
            HideEvent: {label: "이벤트 숨기기", type: "checkbox", default: false},
            HideRecommendEffect: {label: "추천 효과 숨기기", type: "checkbox", default: false},
            HideViewerThumbnail: {label: "뷰어 썸네일 숨기기", type: "checkbox", default: false},
            InfoUnfold: {label: "상세정보 항상 보기", type: "checkbox", default: false},
            NaviColor: {label: "뷰어 배경색으로 네비 색 변경", type: "checkbox", default: false},
            HidePlus: {label: "검색시 플러스 숨기기", type: "checkbox", default: false},
            HideNotice: {label: "공지 숨기기 버튼 추가", type: "checkbox", default: false},
            HideOnlyEmojiComment: {label: "노벨티콘만 있는 댓글 숨기기", type: "checkbox", default: false},
            HideOnlyEmojiComment_Remove: {label: "노벨티콘만 있는 댓글 완전히 숨기기", type: "checkbox", default: false},
            DisableNovelAlert: {label: "회차 클릭 알림 제거", type: "checkbox", default: false}
        }
    },
    start({
        HideAd, HideEvent, HideRecommendEffect, HideViewerThumbnail,
        InfoUnfold, NaviColor, HidePlus, HideNotice,
        HideOnlyEmojiComment, HideOnlyEmojiComment_Remove, DisableNovelAlert
    }) {
        if (HideAd) {
            GM_addStyle(`
                img[alt=우최공] { display: none!important; }
                img[src$="bnr_subtop_contest2023_m_3.jpg"] { display: none!important; }
                .main-slide-wrapper { display: none!important; }
                .swiper-container { display: none!important; }
                img[alt="내서재 광고"] { display: none!important; }
                .ad_banner { display: none!important; }
                img[alt=광고] { display: none!important; }
                .story_bnr { display: none!important; }
                .comic_bnr { display: none!important; }
                .novel_banner { display: none!important; }
                img[alt="자유연재 광고"] { display: none!important; }
                .calc-event-wrapper { display: none!important; }
                #slide-banner-box-mobile { display: none!important; }
                #top-swiper-banner { display: none!important; }
                #sub_sale_modal_v2 { display: none!important; }
                .comic-banner-wrap { display: none!important; }
                .bottom_banner_wrapper { display: none!important; }
            `);
        }

        if (HideEvent && /^\/contest_list$/.test(location.pathname)) {
            GM_addStyle(".swiper-container2 { display: none!important; }");
        }

        if (HideRecommendEffect && /^\/viewer\//.test(location.pathname)) {
            GM_addStyle(".like_btn { display: none!important; }");
        }

        if (HideViewerThumbnail && /^\/viewer\//.test(location.pathname)) {
            GM_addStyle(".cover-wrapper { display: none !important; }");
        }

        if (InfoUnfold && /^\/novel\//.test(location.pathname))
            document.querySelector<HTMLElement>(".more-synopsis")?.click();

        if (NaviColor && /^\/viewer\//.test(location.pathname)) {
            const changeTheme = () => {
                const viewerNoDrag = document.querySelector<HTMLElement>("#viewer_no_drag");
                const color = viewerNoDrag ? getComputedStyle(viewerNoDrag).backgroundColor : "";

                if (!color) return;

                const headerEl = document.querySelector<HTMLElement>(HEADER_BAR);
                if (headerEl) headerEl.style.backgroundColor = color;
                const footerEl = document.querySelector<HTMLElement>(FOOTER_BAR);
                if (footerEl) footerEl.style.backgroundColor = color;
            };

            if (!viewerDisplayHooked) {
                viewerDisplayHooked = true;
                const original = unsafeWindow.viewer_display;
                unsafeWindow.viewer_display = function (...args: unknown[]) {
                    Reflect.apply(original, this, args);
                    changeTheme();
                };
            }

            changeTheme();
        }

        if (HidePlus && /^\/search\//.test(location.pathname)) {
            let plusCount = 0;

            for (const element of document.querySelectorAll(".b_plus")) {
                element.closest("div[class=mobile_show]")?.remove();
                plusCount++;
            }

            document.querySelector(`span[style="font-size: 14px;font-weight: 600;"]`)
                ?.insertAdjacentHTML("beforeend", `<br><span style="color: #d23a3a; font-size: 12px;">(PLUS ${plusCount}개 차단)</span>`);
        }

        if (HideNotice && /^\/novel/.test(location.pathname)) {
            document.querySelectorAll(".notice_toggle_btn").forEach(el => {
                el.addEventListener("click", () => {
                    const upNotice = document.querySelector<HTMLElement>("#upNotice");
                    if (upNotice) upNotice.style.display = "";
                });
            });

            const trHtml = `<tr class="notice_toggle_btn" id="upNotice" style="width: 100%; text-align: center; font-weight: 600; padding: 15px; background-color: #feffe5; border-bottom: 1px solid #f7f7f7; cursor: pointer; display: none;"><td colspan="3" style="padding: 10px 0;">숨기기 <i class="icon ion-android-arrow-up"></i></td></tr>`;

            const tbody = document.querySelector(".notice_table > tbody");
            if (tbody) {
                const wrapper = document.createElement("tbody");
                wrapper.innerHTML = trHtml;
                const trElement = wrapper.firstElementChild as HTMLElement | null;
                if (trElement) {
                    trElement.addEventListener("click", () => {
                        document.querySelectorAll(".notice_toggle_btn").forEach(btn => {
                            (btn as HTMLElement).style.display = "";
                            let next = btn.nextElementSibling;
                            while (next) {
                                if (next.classList.contains("ep_style4"))
                                    (next as HTMLElement).style.display = "none";
                                next = next.nextElementSibling;
                            }
                        });
                        const upNotice = document.querySelector<HTMLElement>("#upNotice");
                        if (upNotice) upNotice.style.display = "none";
                    });
                    tbody.appendChild(trElement);
                }
            }
        }

        if (HideOnlyEmojiComment && /^\/viewer\//.test(location.pathname)) {
            commentLoaded(() => {
                for (const element of document.querySelectorAll("#comment_load > div[class*=comment] > .comment_wrap > .comment_content > .comment_img")) {
                    const el = element as HTMLElement;

                    if (
                        getComputedStyle(el).display === "none" ||
                        (el.parentElement?.querySelector(".comment_text")?.textContent?.length ?? 0) > 0 ||
                        el.closest(".comment")?.getAttribute("data-status") !== "1"
                    ) continue;

                    const commentEl = el.closest(".comment");
                    if (!commentEl) continue;

                    if (HideOnlyEmojiComment_Remove) {
                        commentEl.remove();
                        continue;
                    }

                    commentEl.setAttribute("data-status", "0");

                    const regDate = el.parentElement?.querySelector(".comment_regdate");
                    const siblings: Element[] = [];
                    if (regDate) {
                        let next = regDate.nextElementSibling;
                        while (next) {
                            siblings.push(next);
                            next = next.nextElementSibling;
                        }
                    }

                    el.parentElement?.insertAdjacentHTML("beforeend", `<span style="color: #999;">노벨티콘만 있는 댓글 입니다.</span><br>`);
                    siblings.forEach(s => s.remove());
                }
            });
        }

        if (DisableNovelAlert && /^\/novel\//.test(location.pathname)) {
            function disableNovelAlert() {
                for (const tr of document.querySelectorAll(`${EP_LIST} > table > tbody > tr`)) {
                    const td = tr.children[1] as HTMLElement | undefined;

                    if (!td?.getAttribute("onclick")?.includes("modal_background"))
                        continue;

                    const firstChildDiv = tr.children[0]?.querySelector("div");
                    if (!firstChildDiv) continue;

                    const attr = Array.from(firstChildDiv.attributes)
                        .find(attr => attr.name.startsWith("novel_on_"))?.name;

                    if (!attr)
                        continue;

                    const url = /^novel_on_(\d*)"$/.exec(attr)?.[1];

                    if (!url) continue;

                    td.setAttribute("onclick", `document.querySelectorAll('.loads').forEach(function(el){el.style.display='';});location='/viewer/${url}'`);
                }
            }

            window.addEventListener("load", () => {
                setTimeout(() => {
                    disableNovelAlert();

                    const observer = new MutationObserver(disableNovelAlert);

                    const epList = document.querySelector(EP_LIST);
                    if (epList) observer.observe(epList, {childList: true});
                }, 1000);
            });
        }
    }
});
