export default {
    enable: ["HideAd"],
    config: {
        head: "광고 숨기기",
        configs: {
            HideAd: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    property: "start",
    start() {
        if (/^\/mybook/.test(location.pathname))
            GM_addStyle(`img[alt="내서재 광고"] { display: none!important; }`);

        if (/^\/viewer\//.test(location.pathname)) {
            GM_addStyle(`.ad_banner { display: none!important; }`);
            GM_addStyle(`img[alt=광고] { display: none!important; }`);
        }

        if (/^\/contest_list/.test(location.pathname))
            GM_addStyle(".swiper-container2 { display: none!important; }");

        if (!/^\/viewer\//.test(location.pathname))
            document.querySelector(`.am-sideleft img[alt="마스터피스 공모전 참가하기"]`)?.closest("li")?.remove();

        if (/^\/ssul/.test(location.pathname))
            GM_addStyle(".story_bnr { display: none!important; }");

        if (/^\/comic/.test(location.pathname))
            GM_addStyle(".comic_bnr { display: none!important; }");

        if (/^\/novel/.test(location.pathname))
            GM_addStyle(".novel_banner { display: none!important; }");

        if (/^\/freestory|plus/.test(location.pathname))
            GM_addStyle(`img[alt="자유연재 광고"] { display: none!important; }`);

        if (/^\/plus/.test(location.pathname))
            GM_addStyle(".plus_bg { display: none!important; }");
    }
} as Module;