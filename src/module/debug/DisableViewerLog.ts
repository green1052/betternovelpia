export default {
    include: /^\/viewer\//,
    enable: ["DisableViewLog"],
    config: {
        head: "뷰어 디버그 로그 제거",
        configs: {
            DisableViewLog: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        const regex = /console.log\(.*\);/g;

        const upDownBtnView = unsafeWindow.up_down_btn_view
            .toString()
            .replace(regex, "");

        unsafeWindow.up_down_btn_view = (option: "on" | "off") =>
            eval(`${upDownBtnView}up_down_btn_view(option)`);

        const naviView = unsafeWindow.navi_view
            .toString()
            .replace(regex, "");

        unsafeWindow.navi_view = () =>
            eval(`${naviView}navi_view()`);
    }
} as Module;