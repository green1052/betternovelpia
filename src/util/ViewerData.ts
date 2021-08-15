interface JsonData {
    text: string,
    size: number,
    align: string
}

export function viewerData(url: string, complete?: Function) {
    const json: JsonData[] = [];

    $.ajax({
        data: {"size": "14"},
        type: "POST",
        dataType: "JSON",
        url: `/proc/viewer_data/${url}`,
        cache: false,
        async: false,
        success: (data) => {
            for (const string of data["s"]) {
                const json_t: JsonData = {
                    text: string["text"],
                    size: 11,
                    align: "left"
                };

                json.push(json_t);
            }
        },
        complete: () => complete
    });

    return json;
}