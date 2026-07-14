type GlobImportedModule = Record<string, unknown>;

declare module "*.tsx" {
    const value: GlobImportedModule[];
    export default value;
    export const asObject: Record<string, GlobImportedModule>;
}
