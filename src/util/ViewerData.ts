export function viewerData(url: string, func?: Function) {
    const json: NovelData[] = [];

    $.ajax({
        data: {"size": "14"},
        type: "POST",
        dataType: "JSON",
        url: `/proc/viewer_data/${url}`,
        cache: false,
        async: false,
        success: (data: { c: string, s: { text: string }[] }) => {
            for (const string of data.s) {
                const json_t: NovelData = {
                    text: string.text,
                    size: 11,
                    align: "left"
                };

                json.push(json_t);
            }
        }
    });

    func?.();

    return json;
}