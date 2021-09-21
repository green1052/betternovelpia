export default {start};

async function start() {
    if (!GM_config.get("BetterLastNovel") || !navigator.userAgent.includes("NOVELPIA_APP"))
        return;

    await checkLastNovel();
    viewer();
}

async function checkLastNovel() {
    if (location.pathname !== "/app")
        return;

    if (localStorage["LAST_EPI_GO"] === "OFF")
        return location.href = "/";

    const lastNovel = await GM.getValue("lastNovel");

    if (!lastNovel)
        return;

    if (confirm("이전에 열었던 회차로 이동하시겠습니까?")) {
        history.pushState({"app": 1}, "메인페이지", "/");
        location.href = lastNovel;

        return;
    }

    if (localStorage["LAST_EPI_GO2"] === "OFF")
        return location.href = "/";

    if (confirm("이전에 열었던 회차 기능을 끄시겠습니까?")) {
        localStorage["LAST_EPI_GO"] = "OFF";
    } else {
        localStorage["LAST_EPI_GO2"] = "OFF";
        alert("기능 설정이 적용되었습니다. 추후 해당기능은 회원정보수정에서 변경할 수 있습니다");
    }

    location.href = "/";
}

function viewer() {
    if (location.pathname.includes("/viewer/"))
        GM.setValue("lastNovel", location.href);
}