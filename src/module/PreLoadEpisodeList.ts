import $ from "jquery";
import {element} from "../util/Element";
import {NOVEL_DRAWING} from "../util/Selectors";

export default {
    include: /^\/viewer\//,
    enable: ["PreLoadEpisodeList"],
    config: {
        head: "목록 미리 불러오기",
        configs: {
            PreLoadEpisodeList: {
                label: "활성화",
                type: "checkbox",
                default: false
            }
        }
    },
    start() {
        element($(NOVEL_DRAWING), () => {
            setTimeout(() => episode_list_viewer(Number(localStorage.getItem(`novel_page_${$("#novel_no").val()}`))), 500);
        });
    }
} as Module;