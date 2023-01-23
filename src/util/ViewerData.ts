export async function viewerData(url: string, cookie?: string): Promise<NovelData[]> {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            data: "size=14",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: cookie ?? document.cookie
            },
            method: "POST",
            timeout: 5000,
            url: `/proc/viewer_data/${url}`,
            onerror: (response) => {
                reject(response);
            },
            onload: (response) => {
                console.log(response.responseText);

                const data: { c: string, s: { text: string }[] } = JSON.parse(response.responseText!);

                resolve(data.s.map(({text}) => {
                    return {
                        text,
                        size: 11,
                        align: "left"
                    };
                }));
            },
            ontimeout: (response) => {
                reject(response);
            }
        });
    });
}