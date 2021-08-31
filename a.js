(async () => {
    let index = 1;
    const page = 0;

    for (let i = 0; i <= page - 1; i++) {
        localStorage[`novel_page_${location.pathname.substring(7)}`] = i;
        episode_list();

        await sleep(200);
        await get();
    }

    console.log("끝");

    async function get() {
        for (const query of document.querySelectorAll("#episode_list > table:nth-child(1) > tbody:nth-child(1) tr")) {
            const td = query.children[1].attributes.getNamedItem("onclick").textContent;
            const click = td.substring(39, td.length - 2);

            $.ajax({
                data: {"size": "14"},
                type: "POST",
                dataType: "JSON",
                url: `${click}`,
                cache: false,
                success: (data) => {
                    let result = "";

                    for (const string of data["s"]) {
                        result += string["text"];
                    }

                    result = result
                        .replace(/&nbsp;/g, "")
                        .replace(/&amp;/g, "&")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&#39;/g, "'")
                        .replace(/&quot;/g, `"`);

                    download(result, `${index}.txt`, "text/plain");

                    console.log(`${index} 끝`);

                    index++;
                }
            });

            await sleep(200);
        }
    }

    function download(data, filename, type) {
        const file = new Blob([data], {type: type});

        if (window.navigator.msSaveOrOpenBlob)
            return window.navigator.msSaveOrOpenBlob(file, filename);

        const a = document.createElement("a");
        const url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})();