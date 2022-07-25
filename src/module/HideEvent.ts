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
        if (location.pathname === "/") {
            unsafeWindow.$.cookie = new Proxy(unsafeWindow.$.cookie, {
                apply(target, thisArg, argumentsList) {
                    return argumentsList?.[0].endsWith("_modal") ? true : Reflect.apply(target, thisArg, argumentsList);
                }
            });
        }

        GM_addStyle(".swiper-container { display: none!important; }");
    }
} as Module;