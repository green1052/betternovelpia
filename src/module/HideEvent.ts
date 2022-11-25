export default {
    include: /^(\/$|\/freestory)/,
    enable: ["HideEvent"],
    config: {
        head: "이벤트 숨기기",
        configs: {
            HideEvent: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    property: "start",
    start() {
        GM_addStyle("#agf_floating { display: none!important; }");
        GM_addStyle(".swiper-container { display: none!important; }");
    }
} as Module;