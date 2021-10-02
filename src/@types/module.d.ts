export {};

declare global {
    interface Module {
        url?: RegExp;
        enable?: Config[];

        start(): void | Promise<void>;
    }
}