import $ from "jquery";

export default {start};

const emojiList = [
    // 노벨피아 20종 움짤세트
    "cisk9bncs/1.gif", "cisk9bncs/2.gif", "cisk9bncs/3.gif",
    "cisk9bncs/4.gif", "cisk9bncs/5.gif", "cisk9bncs/6.gif",
    "cisk9bncs/7.gif", "cisk9bncs/8.gif", "cisk9bncs/9.gif",
    "cisk9bncs/10.gif", "cisk9bncs/11.gif", "cisk9bncs/12.gif",
    "cisk9bncs/13.gif", "cisk9bncs/14.gif", "cisk9bncs/15.gif",
    "cisk9bncs/16.gif", "cisk9bncs/17.gif", "cisk9bncs/18.gif",
    "cisk9bncs/19.gif", "cisk9bncs/20.gif",

    // 매도당하고 싶은 엘프님
    "ibn8cm8xa/1.png", "ibn8cm8xa/2.png", "ibn8cm8xa/3.png",
    "ibn8cm8xa/4.png", "ibn8cm8xa/5.png", "ibn8cm8xa/6.png",
    "ibn8cm8xa/7.png", "ibn8cm8xa/8.png", "ibn8cm8xa/9.png",
    "ibn8cm8xa/10.png", "ibn8cm8xa/11.png", "ibn8cm8xa/12.png",
    "ibn8cm8xa/13.png", "ibn8cm8xa/14.png", "ibn8cm8xa/15.png",
    "ibn8cm8xa/16.png", "ibn8cm8xa/17.png", "ibn8cm8xa/18.png",
    "ibn8cm8xa/19.png", "ibn8cm8xa/20.png",

    // 이세계 검은머리 외국인
    "knbivm28nc/1.png", "knbivm28nc/2.png", "knbivm28nc/3.png",
    "knbivm28nc/4.png", "knbivm28nc/5.png", "knbivm28nc/6.png",
    "knbivm28nc/7.png", "knbivm28nc/8.png", "knbivm28nc/9.png",
    "knbivm28nc/10.png", "knbivm28nc/11.png", "knbivm28nc/12.png",
    "knbivm28nc/13.png", "knbivm28nc/14.png", "knbivm28nc/15.png",
    "knbivm28nc/16.png", "knbivm28nc/17.png", "knbivm28nc/18.png",
    "knbivm28nc/19.png", "knbivm28nc/20.png",

    // 코끼리
    "xlzirt8931jc/1.png", "xlzirt8931jc/2.png", "xlzirt8931jc/3.png",
    "xlzirt8931jc/4.png", "xlzirt8931jc/5.png", "xlzirt8931jc/6.png",
    "xlzirt8931jc/7.gif", "xlzirt8931jc/8.gif", "xlzirt8931jc/9.png",
    "xlzirt8931jc/10.png", "xlzirt8931jc/11.gif", "xlzirt8931jc/12.png",
    "xlzirt8931jc/13.png", "xlzirt8931jc/14.png", "xlzirt8931jc/15.gif",
    "xlzirt8931jc/16.png", "xlzirt8931jc/17.png", "xlzirt8931jc/18.png",
    "xlzirt8931jc/19.png", "xlzirt8931jc/20.png",

    // 8월 결제자 한정 기념 콘 (노벨짱)
    "cgic8n873m/1.gif", "cgic8n873m/2.gif", "cgic8n873m/3.gif",

    // 창작물 속으로
    "xjbtncos93/1.png", "xjbtncos93/2.png", "xjbtncos93/3.png",
    "xjbtncos93/4.png", "xjbtncos93/5.png", "xjbtncos93/6.png",
    "xjbtncos93/7.png", "xjbtncos93/8.png", "xjbtncos93/9.png",
    "xjbtncos93/10.png", "xjbtncos93/11.png", "xjbtncos93/12.png",
    "xjbtncos93/13.png", "xjbtncos93/14.png", "xjbtncos93/15.png",
    "xjbtncos93/16.png", "xjbtncos93/17.png", "xjbtncos93/18.png",
    "xjbtncos93/19.png", "xjbtncos93/20.png",

    // 헬창?
    "d89nyunhc/1.png", "d89nyunhc/2.png", "d89nyunhc/3.png",
    "d89nyunhc/4.png", "d89nyunhc/5.png", "d89nyunhc/6.png",
    "d89nyunhc/7.png", "d89nyunhc/8.png", "d89nyunhc/9.png",
    "d89nyunhc/10.png", "d89nyunhc/11.png", "d89nyunhc/12.png",
    "d89nyunhc/13.png", "d89nyunhc/14.png", "d89nyunhc/15.png",
    "d89nyunhc/16.png", "d89nyunhc/17.png", "d89nyunhc/18.png",
    "d89nyunhc/19.png", "d89nyunhc/20.png",

    // 어딜 도망가?
    "sk8578nc9s/1.png", "sk8578nc9s/2.png", "sk8578nc9s/3.png",
    "sk8578nc9s/4.png", "sk8578nc9s/5.png", "sk8578nc9s/6.png",
    "sk8578nc9s/7.png", "sk8578nc9s/8.png", "sk8578nc9s/9.png",
    "sk8578nc9s/10.png", "sk8578nc9s/11.png", "sk8578nc9s/12.png",
    "sk8578nc9s/13.png", "sk8578nc9s/14.png", "sk8578nc9s/15.png",
    "sk8578nc9s/16.png", "sk8578nc9s/17.png", "sk8578nc9s/18.png",
    "sk8578nc9s/19.png", "sk8578nc9s/20.png",

    // 옴뇸뇸 (노벨짱)
    "c89ckhbn31/1.png", "c89ckhbn31/2.png", "c89ckhbn31/3.png",
    "c89ckhbn31/4.png", "c89ckhbn31/5.png", "c89ckhbn31/6.png",
    "c89ckhbn31/7.png", "c89ckhbn31/8.png", "c89ckhbn31/9.png",
    "c89ckhbn31/10.png", "c89ckhbn31/11.png", "c89ckhbn31/12.png",
    "c89ckhbn31/13.png", "c89ckhbn31/14.png", "c89ckhbn31/15.png",
    "c89ckhbn31/16.png", "c89ckhbn31/17.png", "c89ckhbn31/18.png",
    "c89ckhbn31/19.png", "c89ckhbn31/20.png",

    // !!! (노벨짱)
    "djhnd74ckl/1.gif", "djhnd74ckl/2.gif", "djhnd74ckl/3.gif",
    "djhnd74ckl/4.gif", "djhnd74ckl/5.gif", "djhnd74ckl/6.gif",
    "djhnd74ckl/7.gif", "djhnd74ckl/8.gif", "djhnd74ckl/9.gif",
    "djhnd74ckl/10.gif",

    // 밤하늘 (노벨짱)
    "8cncu387x1/1.jpg", "8cncu387x1/2.jpg", "8cncu387x1/3.jpg",
    "8cncu387x1/4.jpg", "8cncu387x1/5.jpg", "8cncu387x1/6.jpg",
    "8cncu387x1/7.jpg", "8cncu387x1/8.jpg", "8cncu387x1/9.jpg",
    "8cncu387x1/10.jpg", "8cncu387x1/11.jpg", "8cncu387x1/12.jpg",
    "8cncu387x1/13.jpg", "8cncu387x1/14.jpg", "8cncu387x1/15.jpg",
    "8cncu387x1/16.jpg", "8cncu387x1/17.jpg", "8cncu387x1/18.jpg",
    "8cncu387x1/19.jpg", "8cncu387x1/20.jpg",

    // 멈춰
    "7cncnncus/1.jpg", "7cncnncus/2.jpg", "7cncnncus/3.jpg",
    "7cncnncus/4.jpg", "7cncnncus/5.jpg", "7cncnncus/6.jpg",
    "7cncnncus/7.jpg", "7cncnncus/8.jpg", "7cncnncus/9.jpg",
    "7cncnncus/10.jpg", "fkvm59192f/1.gif",

    // 누렁이
    "fkvm59192f/2.gif", "fkvm59192f/3.png", "fkvm59192f/4.gif",
    "fkvm59192f/5.gif", "fkvm59192f/6.gif", "fkvm59192f/7.gif",
    "fkvm59192f/8.png", "fkvm59192f/9.gif", "fkvm59192f/10.png",
    "fkvm59192f/11.gif", "fkvm59192f/12.gif", "fkvm59192f/13.gif",
    "fkvm59192f/14.gif", "fkvm59192f/15.gif", "fkvm59192f/16.gif",
    "fkvm59192f/17.gif", "fkvm59192f/18.gif", "fkvm59192f/19.gif",
    "fkvm59192f/20.gif",

    // 후후후
    "hncnit834z/1.jpg", "hncnit834z/2.jpg", "hncnit834z/3.jpg",
    "hncnit834z/4.jpg", "hncnit834z/5.jpg", "hncnit834z/6.jpg",
    "hncnit834z/7.jpg", "hncnit834z/8.jpg", "hncnit834z/9.jpg",
    "hncnit834z/10.jpg", "hncnit834z/11.jpg", "hncnit834z/12.jpg",
    "hncnit834z/13.jpg", "hncnit834z/14.jpg", "hncnit834z/15.jpg",
    "hncnit834z/16.jpg", "hncnit834z/17.jpg", "hncnit834z/18.jpg",
    "hncnit834z/19.jpg", "hncnit834z/20.jpg",

    // 둠칫 둠칫
    "boksrjfna9231/1.gif", "boksrjfna9231/2.gif", "boksrjfna9231/3.gif",
    "boksrjfna9231/4.gif", "boksrjfna9231/5.gif", "boksrjfna9231/6.gif",
    "boksrjfna9231/7.gif", "boksrjfna9231/8.gif", "boksrjfna9231/9.gif",
    "boksrjfna9231/10.gif", "boksrjfna9231/1a.gif", "boksrjfna9231/2a.gif",
    "boksrjfna9231/3a.gif", "boksrjfna9231/4a.gif", "boksrjfna9231/5a.gif",
    "boksrjfna9231/6a.gif", "boksrjfna9231/7a.gif", "boksrjfna9231/8a.gif",
    "boksrjfna9231/9a.gif", "boksrjfna9231/10a.gif",

    // 푸르릉
    "ckb858mcis/1.png", "ckb858mcis/2.png", "ckb858mcis/3.png",
    "ckb858mcis/4.png", "ckb858mcis/5.gif", "ckb858mcis/6.png",
    "ckb858mcis/7.png", "ckb858mcis/8.png", "ckb858mcis/9.png",
    "ckb858mcis/10.gif",

    // 노벨짱
    "8cmnci8xa/1.png", "8cmnci8xa/2.png", "8cmnci8xa/3.png",
    "8cmnci8xa/4.png", "8cmnci8xa/5.png", "8cmnci8xa/6.png",
    "8cmnci8xa/7.png", "8cmnci8xa/8.png", "8cmnci8xa/9.png",
    "8cmnci8xa/10.png", "8cmnci8xa/1b.png", "8cmnci8xa/2b.png",
    "8cmnci8xa/3b.png", "8cmnci8xa/4b.png", "8cmnci8xa/5b.png",
    "8cmnci8xa/6b.png", "8cmnci8xa/7b.png", "8cmnci8xa/8b.png",
    "8cmnci8xa/9b.png", "8cmnci8xa/10b.png",

    // 기대 중
    "bjos3017us/1.png", "bjos3017us/2.png", "bjos3017us/3.png",
    "bjos3017us/4.png", "bjos3017us/5.png", "bjos3017us/6.png",
    "bjos3017us/7.png", "bjos3017us/8.png", "bjos3017us/9.png",
    "bjos3017us/10.png",

    // 헤 (마녀의 도시)
    "noidje1sc0/1.png", "noidje1sc0/2.png", "noidje1sc0/3.png",
    "noidje1sc0/4.png", "noidje1sc0/5.png", "noidje1sc0/6.png",
    "noidje1sc0/7.png", "noidje1sc0/8.png", "noidje1sc0/9.png",
    "noidje1sc0/10.png", "noidje1sc0/11.png", "noidje1sc0/12.png",
    "noidje1sc0/13.png", "noidje1sc0/14.png", "noidje1sc0/15.png",
    "noidje1sc0/16.png", "noidje1sc0/17.png", "noidje1sc0/18.png",
    "noidje1sc0/19.png", "noidje1sc0/20.png",

    //추천 팡팡
    "nj7haxicm/1.png",
    "nj7haxicm/2.png", "nj7haxicm/3.png", "nj7haxicm/4.png",
    "nj7haxicm/5.png", "nj7haxicm/6.png", "nj7haxicm/7.png",
    "nj7haxicm/8.png", "nj7haxicm/9.png", "nj7haxicm/10.png",
    "nj7haxicm/11.png", "nj7haxicm/12.png", "nj7haxicm/13.png",
    "nj7haxicm/14.png", "nj7haxicm/15.png", "nj7haxicm/16.png",
    "nj7haxicm/17.png", "nj7haxicm/18.png", "nj7haxicm/19.png",
    "nj7haxicm/20.png",

    // 한심하군
    "cnc92j3n9/1.png", "cnc92j3n9/2.png",
    "cnc92j3n9/3.png", "cnc92j3n9/4.png", "cnc92j3n9/5.png",
    "cnc92j3n9/6.png", "cnc92j3n9/7.png", "cnc92j3n9/8.png",
    "cnc92j3n9/9.png", "cnc92j3n9/10.png", "cnc92j3n9/2a.png",
    "cnc92j3n9/6a.png", "cnc92j3n9/7a.png", "cnc92j3n9/9a.png",
    "cnc92j3n9/10a.png",

    // 파이어 펀치
    "cn183nz04/1.png", "cn183nz04/2.png",
    "cn183nz04/3.png", "cn183nz04/4.png", "cn183nz04/5.png",
    "cn183nz04/6.png", "cn183nz04/7.png", "cn183nz04/8.png",
    "cn183nz04/9.png", "cn183nz04/10.png", "cn183nz04/11.png",
    "cn183nz04/12.png", "cn183nz04/13.png", "cn183nz04/14.png",
    "cn183nz04/15.png", "cn183nz04/16.png", "cn183nz04/17.png",
    "cn183nz04/18.png", "cn183nz04/19.png", "cn183nz04/20.png",
    "cn183nz04/21.png",

    // 멈춰
    "ac95n1038/1.png", "ac95n1038/2.png",
    "ac95n1038/3.png", "ac95n1038/4.png", "ac95n1038/5.png",
    "ac95n1038/6.png", "ac95n1038/7.png", "ac95n1038/8.png",
    "ac95n1038/9.png", "ac95n1038/10.png", "ac95n1038/11.png",
    "ac95n1038/12.png", "ac95n1038/13.png", "ac95n1038/14.png",
    "ac95n1038/15.png", "ac95n1038/16.png", "ac95n1038/17.png",
    "ac95n1038/18.png", "ac95n1038/19.png", "ac95n1038/20.png",

    // 마녀의 도시
    "fofmslk3s/1.png", "fofmslk3s/2.png", "fofmslk3s/3.png",
    "fofmslk3s/4.png", "fofmslk3s/5.png", "fofmslk3s/6.png",
    "fofmslk3s/7.png", "fofmslk3s/8.png", "fofmslk3s/9.png",
    "fofmslk3s/10.png", "fofmslk3s/11.png", "fofmslk3s/12.png",
    "fofmslk3s/13.png", "fofmslk3s/14.png", "fofmslk3s/15.png",
    "fofmslk3s/16.png", "fofmslk3s/17.png", "fofmslk3s/18.png",
    "fofmslk3s/19.png", "fofmslk3s/20.png",

    // 댓글인줄 알았지?
    "xcn8c947mc/1.png",
    "xcn8c947mc/2.png", "xcn8c947mc/3.png", "xcn8c947mc/4.png",
    "xcn8c947mc/5.png", "xcn8c947mc/6.png", "xcn8c947mc/7.png",
    "xcn8c947mc/8.png", "xcn8c947mc/9.png", "xcn8c947mc/10.png",
    "xcn8c947mc/11.png", "xcn8c947mc/12.png", "xcn8c947mc/13.png",
    "xcn8c947mc/14.png", "xcn8c947mc/15.png", "xcn8c947mc/16.png",
    "xcn8c947mc/17.png", "xcn8c947mc/18.png", "xcn8c947mc/19.png",
    "xcn8c947mc/20.png",

    // 헤흡
    "fh393nc8is/1.jpg", "fh393nc8is/2.jpg",
    "fh393nc8is/3.jpg", "fh393nc8is/4.jpg", "fh393nc8is/5.jpg",
    "fh393nc8is/6.jpg", "fh393nc8is/7.jpg", "fh393nc8is/8.jpg",
    "fh393nc8is/9.jpg", "fh393nc8is/10.jpg", "fh393nc8is/11.jpg",
    "fh393nc8is/12.jpg", "fh393nc8is/13.jpg", "fh393nc8is/14.jpg",
    "fh393nc8is/15.jpg", "fh393nc8is/16.jpg", "fh393nc8is/17.jpg",
    "fh393nc8is/18.jpg", "fh393nc8is/19.jpg", "fh393nc8is/20.jpg",

    // 어이 반갑다
    "fzl38bnvsa/1.jpg", "fzl38bnvsa/2.jpg", "fzl38bnvsa/3.jpg",
    "fzl38bnvsa/4.jpg", "fzl38bnvsa/5.jpg", "fzl38bnvsa/6.jpg",
    "fzl38bnvsa/7.jpg", "fzl38bnvsa/8.jpg", "fzl38bnvsa/9.jpg",
    "fzl38bnvsa/10.jpg", "fzl38bnvsa/11.jpg", "fzl38bnvsa/12.jpg",
    "fzl38bnvsa/13.jpg", "fzl38bnvsa/14.jpg", "fzl38bnvsa/15.jpg",
    "fzl38bnvsa/16.jpg", "fzl38bnvsa/17.jpg", "fzl38bnvsa/18.jpg",
    "fzl38bnvsa/19.jpg", "fzl38bnvsa/20.jpg",

    // 멍
    "d89jg198x/1.jpg", "d89jg198x/2.jpg", "d89jg198x/3.jpg",
    "d89jg198x/4.jpg", "d89jg198x/5.jpg", "d89jg198x/6.jpg",
    "d89jg198x/7.jpg", "d89jg198x/8.jpg", "d89jg198x/9.jpg",
    "d89jg198x/10.jpg", "d89jg198x/11.jpg", "d89jg198x/12.jpg",
    "d89jg198x/13.jpg", "d89jg198x/14.jpg", "d89jg198x/15.jpg",
    "d89jg198x/16.jpg", "d89jg198x/17.jpg", "d89jg198x/18.jpg",
    "d89jg198x/19.jpg", "d89jg198x/20.jpg"
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

    $("ul.nav:nth-child(2)").children().eq(3).before(li);

    // 클릭 시 보이는 창

    const div = $(`<div id="emoticon_shop0" class="col-sm-12 mg-b-10 emoticon">`)
        .css("display", "none")
        .css("border", "1px solid rgba(214, 214, 214, 0.2)")
        .css("padding", "5px")
        .css("border-radius", "10px");

    for (let value of emojiList) {
        const emoji = `//image.novelpia.com/img/emoticon/${value}`;

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


    $("div.row:nth-child(2) > div:nth-child(2)").append(div);
}