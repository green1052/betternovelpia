export async function viewerData(url: string, func?: () => void) {
    const response = await fetch(`/proc/viewer_data/${url}`, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        body: JSON.stringify({size: 14})
    });

    func?.();

    return [
        ...(<{ c: string, s: { text: string }[] }>(await response.json())).s.map(({text}) => {
            return {
                text: text,
                size: 11,
                align: "left"
            } as NovelData;
        })
    ];
}