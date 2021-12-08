export function viewerData(url: string, cookie?: { LOGINKEY: string, USERKEY: string }): Promise<NovelData[]> {
    return new Promise((resolve, reject) => {
        let headers: { [key in string]: string } = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        };

        if (cookie && cookie.LOGINKEY && cookie.USERKEY)
            headers.Cookie = `LOGINKEY=${cookie.LOGINKEY}; USERKEY=${cookie.USERKEY};`;

        GM_xmlhttpRequest({
            url: `/proc/viewer_data/${url}`,
            method: "POST",
            headers: headers,
            responseType: "json",
            timeout: 5000,
            data: `{size:14}`,
            onload: (response) => {
                if (!response.responseText) {
                    reject();
                    return;
                }

                const data = JSON.parse(response.responseText) as { c: string, s: { text: string }[] };

                resolve(data.s.map(({text}) => {
                    return {
                        text: text,
                        size: 11,
                        align: "left"
                    };
                }));
            },
            onerror(response) {
                reject(response.responseText);
            },
            ontimeout(response) {
                reject(response.responseText);
            }
        });
    });
}