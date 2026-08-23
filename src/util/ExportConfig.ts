import {GM_getValue, GM_listValues} from "$";

export function exportConfig(): Record<string, unknown> {
    return GM_listValues().reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = GM_getValue(key);
        return acc;
    }, {});
}
