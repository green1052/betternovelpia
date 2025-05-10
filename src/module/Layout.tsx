import {EP_List, FOOTER_BAR, HEADER_BAR} from "../util/Selectors";
import {commentLoaded} from "../util/CommentLoaded";
import $ from "cash-dom";
import React from "react";
import ReactDOMServer from "react-dom/server";

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
            }
        }
    },
    property: "start",
    start: function () {
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

        if (hideAdEnable) {
            GM_addStyle("img[alt=우최공] { display: none!important; }");
            GM_addStyle(`img[src$="bnr_subtop_contest2023_m_3.jpg"] { display: none!important; }`);

            GM_addStyle(`.main-slide-wrapper { display: none!important; }`);
            GM_addStyle(".swiper-container { display: none!important; }");

            GM_addStyle(`img[alt="내서재 광고"] { display: none!important; }`);
            GM_addStyle(".ad_banner { display: none!important; }");
            GM_addStyle("img[alt=광고] { display: none!important; }");
            GM_addStyle(".story_bnr { display: none!important; }");
            GM_addStyle(".comic_bnr { display: none!important; }");
            GM_addStyle(".novel_banner { display: none!important; }");
            GM_addStyle(`img[alt="자유연재 광고"] { display: none!important; }`);
            GM_addStyle(".calc-event-wrapper { display: none!important; }");
            GM_addStyle("#slide-banner-box-mobile { display: none!important; }");
            GM_addStyle("#top-swiper-banner { display: none!important; }");

            GM_addStyle("#sub_sale_modal_v2 { display: none!important; }");
            GM_addStyle(".comic-banner-wrap { display: none!important; }");
            GM_addStyle(".bottom_banner_wrapper { display: none!important; }");
        }

        // if (hideEventEnable && /^\/freestory$/.test(location.pathname)) {
        //     GM_addStyle(".swiper-container { display: none!important; }");
        // }

        if (hideEventEnable && /^\/contest_list$/.test(location.pathname)) {
            GM_addStyle(".swiper-container2 { display: none!important; }");
        }

        if (hideRecommendEffectEnable && /^\/viewer\//.test(location.pathname)) {
            GM_addStyle(".like_btn { display: none!important; }");
        }

        if (hideViewerThumbnailEnable && /^\/viewer\//.test(location.pathname)) {
            GM_addStyle(".cover-wrapper { display: none !important; }");
        }

        if (infoUnfoldEnable && /^\/novel\//.test(location.pathname))
            $(".more-synopsis").get(0)?.click();

        if (naviColorEnable && /^\/viewer\//.test(location.pathname)) {
            const changeTheme = () => {
                const color = $("#viewer_no_drag").css("background-color");

                if (!color) return;

                $(HEADER_BAR).css("background-color", color);
                $(FOOTER_BAR).css("background-color", color);
            };

            unsafeWindow.viewer_display =
                new Proxy(unsafeWindow.viewer_display, {
                    apply(target, thisArg, argArray) {
                        Reflect.apply(target, thisArg, argArray);
                        changeTheme();
                    }
                });

            changeTheme();
        }

        if (hidePlusEnable && /^\/search\//.test(location.pathname)) {
            let plusCount = 0;

            for (const element of $(".b_plus")) {
                element.closest("div[class=mobile_show]")?.remove();
                plusCount++;
            }

            const html = (
                <>
                    <br/>
                    <span style={{color: "#d23a3a", fontSize: "12px"}}>
                        (PLUS {plusCount}개 차단)
                    </span>
                </>
            );

            $(`span[style="font-size: 14px;font-weight: 600;"]`).append(ReactDOMServer.renderToStaticMarkup(html));
        }

        if (hideNoticeEnable && /^\/novel/.test(location.pathname)) {
            $(".notice_toggle_btn").on("click", () => $("#upNotice").show());

            const html = (
                <tr className="notice_toggle_btn" id="upNotice" style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "600",
                    padding: "15px",
                    backgroundColor: "#feffe5",
                    borderBottom: "1px solid #f7f7f7",
                    cursor: "pointer",
                    display: "none"
                }}>
                    <td colSpan={3} style={{padding: "10px 0"}}>
                        숨기기
                        <i className="icon ion-android-arrow-up"/>
                    </td>
                </tr>
            );
            $(".notice_table > tbody")
                .append(
                    $(ReactDOMServer.renderToStaticMarkup(html))
                        .on("click", () => {
                            for (const element of $(".notice_toggle_btn").show().nextAll()) {
                                const $element = $(element);

                                if ($element.hasClass("ep_style4"))
                                    $element.hide();
                            }

                            $("#upNotice").hide();
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
    }
} as Module;
