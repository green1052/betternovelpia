export default {GetConfig, GetValue, SetValue};

function GetConfig(key: string) {
    // @ts-ignore
    return GM_config.get(key);
}

async function GetValue(key: string) {
    // @ts-ignore
    return await GM.getValue(key);
}

function SetValue(key: string, value: any) {
    // @ts-ignore
    return GM.setValue(key, value);
}