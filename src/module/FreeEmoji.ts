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

    $("#submenu_bar .nav-item").before(`<img src="//image.novelpia.com/img/emoticon/1/02-smile.png" style="width:35px;margin:3px 8px 3px 0;cursor:pointer;" onclick="$('.favorite_box img').attr('src','/img/new/viewer/favorites_0.png');favoriDepth = 1;$('.emoticon').hide();emoticon_open('0');">`);

    const div = $(`<div class="col-sm-12 mg-b-10 emoticon" style="display:none;padding: 10px 15px;background-color: #F8F9FA;border-top: 1px solid #e8e8e8;margin-bottom: 0;" id="emoticon_shop0">`);

    const div2 = $(`<div style="display: grid;flex-wrap: nowrap;grid-template-columns: repeat(auto-fill, 60px);gap: 14px 14px;justify-content: space-between;">`);

    for (const value of emojiList) {
        const [id, minMax, type, letter] = value.split("|");
        const [min, max] = minMax.split("-");

        for (let i = Number(min); i <= Number(max); i++) {
            const emoji = `//image.novelpia.com/img/emoticon/${id}/${i}${letter}.${type}`;
            div2.append(`<img data-src="${emoji}" src="//image.novelpia.com/img/emoticon/none.gif" style="width:60px;margin:3px;cursor:pointer;" onclick="EmoticonView('0','${emoji}','306','/img/new/viewer/star_off.png','0');">`);
        }
    }

    div.append(div2);

    $("#comment_box > div > div > div.row.mg-t-5 > div:nth-child(2)").append(div);
}