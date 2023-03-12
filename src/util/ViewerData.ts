import ky from "ky";

export async function viewerData(url: string, code?: () => void): Promise<NovelData[]> {
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
