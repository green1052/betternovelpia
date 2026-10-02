import {GM_getValue} from "$";

interface Field {
    label: string;
}

export interface TextField extends Field {
    type: "text";
    default?: string;
}

export interface IntField extends Field {
    type: "int";
    min: number;
    max: number;
    default?: number;
}

export interface CheckboxField extends Field {
    type: "checkbox";
    default: boolean;
}

export type ConfigField = TextField | IntField | CheckboxField;
export type ConfigFields = Record<string, ConfigField>;

type FieldValue<F extends ConfigField> =
    F extends CheckboxField ? boolean :
        F extends IntField ? number : string;

export type Settings<T extends ConfigFields> = {
    [K in keyof T]: FieldValue<T[K]>;
};

export interface ModuleConfig<T extends ConfigFields = ConfigFields> {
    head: string;
    configs: T;
}

export interface Module<T extends ConfigFields = ConfigFields> {
    include?: RegExp;
    exclude?: RegExp;
    /** 모두 켜져 있어야 실행되는 체크박스 설정 키 */
    enable?: NoInfer<keyof T & string>[];
    config?: ModuleConfig<T>;
    runAt?: "document-start" | "document-end";

    start(settings: Settings<T>): void | Promise<void>;
}

export interface ModuleInfo {
    name: string;
    module: Module;
}

export const registeredModules: ModuleInfo[] = [];

export function defineModule<T extends ConfigFields = {}>(module: Module<T>): Module {
    return module as unknown as Module;
}

export function resolveSettings<T extends ConfigFields>(configs: T): Settings<T> {
    const settings: Record<string, boolean | number | string> = {};
    for (const [key, field] of Object.entries(configs))
        settings[key] = GM_getValue(key, field.default ?? (field.type === "int" ? 0 : ""));
    return settings as Settings<T>;
}
