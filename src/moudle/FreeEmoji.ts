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
    "https://image.novelpia.com/img/emoticon2/ac95n1038/20.png"
];

function Start() {
    if (!Config.GetConfig("FreeEmoji") || !location.pathname.includes("/viewer/"))
        return;

    const div = document.createElement("div");
    div.id = "FreeEmoticon";
    div.className = "col-sm-12 mg-b-10 emoticon";
    div.style.display = "none";
    div.style.border = "1px solid rgba(214, 214, 214, 0.2)";
    div.style.padding = "5px";
    div.style.borderRadius = "10px";

    emojiList.forEach(emoji => {
        const img = document.createElement("img");
        img.src = emoji;
        img.style.width = "30px";
        img.style.margin = "3px";
        img.style.cursor = "pointer";

        img.onclick = () => {
            $("#FreeEmoticon").hide();
            $("#imagePreviewframe").show();

            $("#imagePreviewA").attr("src", emoji);
            $("#comment_img").val(emoji);
        };

        div.appendChild(img);
    });

    $("div.row:nth-child(2) > div:nth-child(2)").append(div);

    const img = document.createElement("img");
    img.src = "https://image.novelpia.com/img/emoticon/1/02-smile.png";
    img.style.width = "30px";
    img.style.margin = "6px 3px 0px";
    img.style.cursor = "pointer";

    const li = document.createElement("li");
    li.className = "nav-item";
    li.innerHTML = img.outerHTML;
    li.onclick = () => {
        $(".emoticon").hide();
        $("#FreeEmoticon").show();
    };

    $("ul.nav:nth-child(2)").prepend(li);
}