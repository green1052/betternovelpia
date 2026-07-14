export {};

declare global {
    interface Field {
        label: string;
    }

    interface Text extends Field {
        type: "text";
        default?: string;
    }

    interface Int extends Field {
        type: "int";
        min: number;
        max: number;
        default?: number;
    }

    interface Checkbox extends Field {
        type: "checkbox";
        default: boolean;
    }

    type ConfigType = Text | Int | Checkbox;

    interface Configs {
        head: string;
        configs: Record<string, ConfigType>;
    }

    interface ModuleInfo {
        name: string;
        module: Module;
    }

    interface Module {
        include?: RegExp;
        exclude?: RegExp;
        enable?: string[];
        config?: Configs;
        runAt?: "document-start" | "document-end";
        start(settings: Record<string, boolean | number | string>): void | Promise<void>;
    }
}
