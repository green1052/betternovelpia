import ky from "ky";

export async function viewerData(url: string, code?: () => void): Promise<NovelData[]> {
    // return new Promise((resolve, reject) => {
    //     GM_xmlhttpRequest({
    //         method: "POST",
    //         url: `/proc/viewer_data/${url}`,
    //         data: "size=14",
    //         headers: {
    //             "Cookie": cookie,
    //         },
    //         cookie: cookie,
    //         responseType: "json",
    //         anonymous: true,
    //         onload: ({response}) => {
    //             resolve((response as { c: string, s: { text: string }[] }).s.map(({text}) => {
    //                 return {
    //                     text: text,
    //                     size: 11,
    //                     align: "left"
    //                 };
    //             }))
    //         },
    //         onerror: reject,
    //     })
    // });

    try {
        const response = await ky.post(`/proc/viewer_data/${url}`, {
            timeout: 5000,
            searchParams: {
                size: "14"
            }
        }).json<{ c: string, s: { text: string }[] }>();

        return response.s.map(({text}) => {
            return {
                text: text,
                size: 11,
                align: "left"
            };
        });
    } finally {
        code?.();
    }
}
