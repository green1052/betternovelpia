import $ from "jquery";

export default {
    url: /^\/viewer\//,
    enable: ["FreeEmoji"],
    start() {
        $(`div[class="col-sm-12 mg-b-10 emoticon"]`).children("div").each((index, element) => {
            const $element = $(element);

            $element.children("img").each((index2, element2) => {
                const $element2 = $(element2);

                const url = $element2.attr("data-src");

                if (!url)
                    return;

                const id = $element.parent().attr("id")!.replace(/^emoticon_shop/, "");

                if ($element2.attr("onclick") !== "alert('보유하고 있는 콘이 아닙니다');")
                    return;

                if (index2 === 0)
                    $("#submenu_bar .nav-item").before(`<img src="${url}" style="width:35px;margin:3px 8px 3px 0px;cursor:pointer;" onclick="$('.favorite_box img').attr('src','/img/new/viewer/favorites_0.png'); favoriDepth = 1;$('.emoticon').hide();emoticon_open('${id}');">`);

                $element2
                    .css("opacity", "")
                    .attr("onclick", `EmoticonView('${id}', '${url}','0','/img/new/viewer/star_off.png','0');`);
            });
        });
    }
} as Module;