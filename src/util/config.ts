type ConfigValue<C extends ConfigType> =
    C extends Checkbox ? boolean :
    C extends Int ? number : string;

export type Settings<T extends Record<string, ConfigType>> = {
    [K in keyof T]: ConfigValue<T[K]>;
};

export function defineModule<T extends Record<string, ConfigType> = {}>(module: {
    include?: RegExp;
    exclude?: RegExp;
    enable?: string[];
    config?: { head: string; configs: T };
    runAt?: "document-start" | "document-end";
    start(settings: Settings<T>): void | Promise<void>;
}): Module {
    return module as unknown as Module;
}

export function resolveSettings(configs: Record<string, ConfigType>): Record<string, boolean | number | string> {
    const settings: Record<string, boolean | number | string> = {};
    for (const [key, def] of Object.entries(configs)) {
        if (def.type === "checkbox") settings[key] = GM_getValue<boolean>(key, def.default);
        else if (def.type === "int") settings[key] = GM_getValue<number>(key, def.default ?? 0);
        else settings[key] = GM_getValue<string>(key, def.default ?? "");
    }
    return settings;
}
