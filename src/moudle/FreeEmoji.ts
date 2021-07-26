export default {Start};
import Config from "../Config";

const emojiList = [
    "https://image.novelpia.com/img/emoticon2/bjos3017us/1.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/2.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/3.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/4.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/5.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/6.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/7.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/8.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/9.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/10.png",
    "https://image.novelpia.com/img/emoticon2/bjos3017us/11.png",

    "https://image.novelpia.com/img/emoticon2/noidje1sc0/1.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/2.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/3.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/4.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/5.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/6.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/7.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/8.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/9.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/10.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/11.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/12.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/13.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/14.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/15.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/16.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/17.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/18.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/19.png",
    "https://image.novelpia.com/img/emoticon2/noidje1sc0/20.png",

    "https://image.novelpia.com/img/emoticon2/nj7haxicm/1.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/2.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/3.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/4.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/5.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/6.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/7.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/8.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/9.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/10.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/11.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/12.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/13.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/14.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/15.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/16.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/17.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/18.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/19.png",
    "https://image.novelpia.com/img/emoticon2/nj7haxicm/20.png",

    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/1.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/2.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/3.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/4.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/5.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/6.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/7.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/8.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/9.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/10.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/11.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/12.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/13.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/14.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/15.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/16.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/17.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/18.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/19.png",
    "https://image.novelpia.com/img/emoticon2/cnc92j3n9/20.png",

    "https://image.novelpia.com/img/emoticon2/cn183nz04/1.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/2.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/3.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/4.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/5.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/6.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/7.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/8.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/9.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/10.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/11.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/12.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/13.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/14.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/15.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/16.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/17.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/18.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/19.png",
    "https://image.novelpia.com/img/emoticon2/cn183nz04/20.png",

    "https://image.novelpia.com/img/emoticon2/ac95n1038/1.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/2.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/3.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/4.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/5.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/6.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/7.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/8.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/9.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/10.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/11.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/12.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/13.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/14.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/15.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/16.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/17.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/18.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/19.png",
    "https://image.novelpia.com/img/emoticon2/ac95n1038/20.png",

    // 누렁이와 흑우
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/1.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/2.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/3.png",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/4.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/5.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/6.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/7.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/8.png",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/9.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/10.png",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/11.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/12.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/13.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/14.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/15.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/16.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/17.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/18.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/19.gif",
    "https://image.novelpia.com/img/emoticon2/fkvm59192f/20.gif",

    // 플레이어의 세계
    "https://image.novelpia.com/img/emoticon2/hncnit834z/1.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/2.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/3.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/4.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/5.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/6.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/7.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/8.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/9.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/10.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/11.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/12.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/13.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/14.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/15.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/16.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/17.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/18.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/19.jpg",
    "https://image.novelpia.com/img/emoticon2/hncnit834z/20.jpg"
];

function Start() {
    if (!Config.GetConfig("FreeEmoji") || !location.pathname.includes("/viewer/"))
        return;

    // 상단 이모지 목록

    const img = $(`<img src="https://image.novelpia.com/img/emoticon/1/02-smile.png">`);
    img.css("width", "30px");
    img.css("margin", "6px 3px 0px");
    img.css("cursor", "pointer");

    const li = $(`<li class="nav-ite">`);
    li.on("click", () => {
        $(".emoticon").hide();
        // @ts-ignore
        emoticon_open("0");
    });

    li.append(img);

    $("ul.nav:nth-child(2)").children().eq(3).before(li);

    // 클릭 시 보이는 창

    const div = $(`<div id="emoticon_shop0" class="col-sm-12 mg-b-10 emoticon">`);
    div.css("display", "none");
    div.css("border", "1px solid rgba(214, 214, 214, 0.2)");
    div.css("padding", "5px");
    div.css("border-radius", "10px\"");

    emojiList.forEach(emoji => {
        const img = $(`<img src="${emoji}">`);
        img.attr("data-src", emoji);
        img.css("width", "60px");
        img.css("margin", "3px");
        img.css("cursor", "pointer");

        img.on("click", () => {
            $("#emoticon_shop0").hide();
            $("#imagePreviewframe").show();
            $("#imagePreviewA").attr("src", emoji);
            $("#comment_img").val(emoji);
        });

        div.append(img);
    });

    $("div.row:nth-child(2) > div:nth-child(2)").append(div);
}