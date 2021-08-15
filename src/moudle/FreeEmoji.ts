import $ from "jquery";

export default {start};

const emojiList = [
    // 노벨피아 20종 움짤세트
    "cisk9bncs|1-20|gif",

    // 매도당하고 싶은 엘프님
    "ibn8cm8xa|1-20|png",

    // 이세계 검은머리 외국인
    "knbivm28nc|1-20|png",

    // 코끼리
    "xlzirt8931jc|1-6|png",
    "xlzirt8931jc|7-8|gif",
    "xlzirt8931jc|9-10|png",
    "xlzirt8931jc|11-11|gif",
    "xlzirt8931jc|12-14|png",
    "xlzirt8931jc|15-15|gif",
    "xlzirt8931jc|16-20|png",

    // 8월 결제자 한정 기념 콘 (노벨짱)
    "cgic8n873m|1-3|gif",

    // 창작물 속으로
    "xjbtncos93|1-20|png",

    // 헬창?
    "d89nyunhc|1-20|png",

    // 어딜 도망가?
    "sk8578nc9s|1-20|png",

    // 옴뇸뇸 (노벨짱)
    "c89ckhbn31|1-20|png",

    // !!! (노벨짱)
    "djhnd74ckl|1-10|gif",

    // 밤하늘 (노벨짱)
    "8cncu387x1|1-20|jpg",

    // 멈춰
    "7cncnncus|1-10|jpg",

    // 누렁이
    "fkvm59192f|1-2|gif",
    "fkvm59192f|3-3|png",
    "fkvm59192f|4-7|gif",
    "fkvm59192f|8-8|png",
    "fkvm59192f|9-9|gif",
    "fkvm59192f|10-10|png",
    "fkvm59192f|11-20|gif",

    // 후후후
    "hncnit834z|1-20|jpg",

    // 둠칫 둠칫
    "boksrjfna9231|1-10|gif",
    "boksrjfna9231|1-10|gif|a",

    // 푸르릉
    "ckb858mcis|1-4|png",
    "ckb858mcis|5-5|gif",
    "ckb858mcis|6-9|png",
    "ckb858mcis|10-10|gif",

    // 노벨짱
    "8cmnci8xa|1-10|png",
    "8cmnci8xa|1-10|png|b",

    // 기대 중
    "bjos3017us|1-10|png",

    // 헤 (마녀의 도시)
    "noidje1sc0|1-20|png",

    //추천 팡팡
    "nj7haxicm|1-20|png",

    // 한심하군
    "cnc92j3n9|1-10|png",
    "cnc92j3n9|2-2|png|a",
    "cnc92j3n9|6-7|png|a",
    "cnc92j3n9|9-10|png|a",

    // 파이어 펀치
    "cn183nz04|1-21|png",

    // 멈춰
    "ac95n1038|1-20|png",

    // 마녀의 도시
    "fofmslk3s|1-20|png",

    // 댓글인줄 알았지?
    "xcn8c947mc|1-20|png",

    // 헤흡
    "fh393nc8is|1-20|jpg",

    // 어이 반갑다
    "fzl38bnvsa|1-20|jpg",

    // 멍
    "d89jg198x|1-20|jpg"
];

function start() {
    if (!GM_config.get("FreeEmoji") || !location.pathname.includes("/viewer/"))
        return;

    // 상단 이모지 목록

    const img = $(`<img src="https://image.novelpia.com/img/emoticon/1/02-smile.png">`)
        .css("width", "30px")
        .css("margin", "6px 3px 0px")
        .css("cursor", "pointer");

    const li = $(`<li class="nav-ite">`)
        .on("click", () => {
            $(".emoticon").hide();
            emoticon_open("0");
        })
        .append(img);

    $("#submenu_bar").children().eq(3).before(li);

    // 클릭 시 보이는 창

    const div = $(`<div id="emoticon_shop0" class="col-sm-12 mg-b-10 emoticon">`)
        .css("display", "none")
        .css("border", "1px solid rgba(214, 214, 214, 0.2)")
        .css("padding", "5px")
        .css("border-radius", "10px");

    for (const value of emojiList) {
        const split = value.split("|");

        const id = split[0];
        const minMax = split[1].split("-");

        let min = Number(minMax[0]);
        let max = Number(minMax[1]);

        const type = split[2] as "png" | "jpg" | "gif";

        const letter = split[3] ?? "";

        for (let i = min; i <= max; i++) {
            const emoji = `https://image.novelpia.com/img/emoticon/${id}/${i}${letter}.${type}`;

            const img = $(`<img src="${emoji}">`)
                .attr("data-src", emoji)
                .css("width", "60px")
                .css("margin", "3px")
                .css("cursor", "pointer")
                .on("click", () => {
                    $("#emoticon_shop0").hide();
                    $("#imagePreviewframe").show();
                    $("#imagePreviewA").attr("src", emoji);
                    $("#comment_img").val(emoji);
                });

            div.append(img);
        }
    }

    $("div.col-sm-12:nth-child(2)").append(div);
}