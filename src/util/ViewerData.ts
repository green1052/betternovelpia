export function fetchWithTimeout(input: RequestInfo, options: RequestInit, timeout = 5000): Promise<Response> {
    // @ts-ignore
    return Promise.race([
        fetch(input, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), timeout)
        )
    ]);
}

export async function viewerData(url: string, code?: () => void): Promise<NovelData[]> {
    try {
        const response: { c: string, s: { text: string }[] } = await (await fetchWithTimeout(`/proc/viewer_data/${url}`, {
            method: "POST",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                size: "14"
            })
        })).json();

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