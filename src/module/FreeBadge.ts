export default {
    include: /^\/page\/useredit/,
    enable: ["FreeBadge"],
    config: {
        head: "뱃지 무료 사용",
        configs: {
            FreeBadge: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        document.body.innerHTML += "<style>#badge_list div.badge_list>div img{filter:initial!important}</style>";

        for (const element of document.querySelectorAll("input[name=badge_no]"))
            element.removeAttribute("disabled");
    }
} as Module;