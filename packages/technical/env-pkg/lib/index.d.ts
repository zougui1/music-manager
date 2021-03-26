/// <reference types="node" />
import * as envVar from './envVar';
export * from './envVar';
export * from './configEnv';
declare const _default: {
    config: (configDir?: string) => void;
    get(): {
        [varName: string]: string;
    };
    get(varName: string): envVar.IOptionalVariable<{}>;
    from<T extends envVar.Extensions>(values: NodeJS.ProcessEnv, extensions?: T | undefined, logger?: envVar.LoggerFn | undefined): envVar.IEnv<envVar.IPresentVariable<T> & envVar.ExtenderType<T>, envVar.IOptionalVariable<T> & envVar.ExtenderTypeOptional<T>>;
    logger(varname: string, str: string): void;
    EnvVarError: typeof envVar.EnvVarError;
    accessors: envVar.PublicAccessors;
};
export default _default;
//# sourceMappingURL=index.d.ts.map