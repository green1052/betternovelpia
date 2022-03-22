export function exportConfig() {
    return GM_listValues().reduce((acc, key) => ({...acc, [key]: GM_getValue(key)}), {});
}