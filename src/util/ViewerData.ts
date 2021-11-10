export function viewerData(url: string, func?: Function) {
    let json: NovelData[] = [];

    $.ajax({
        data: {"size": "14"},
        type: "POST",
        dataType: "JSON",
        url: `/proc/viewer_data/${url}`,
        cache: false,
        async: false,
        success: (data: { c: string, s: { text: string }[] }) => {
            json = data.s.map(({text}) => {
                return {
                    text: text,
                    size: 11,
                    align: "left"
                };
            });
        }
    });

    func?.();

    return json;
}