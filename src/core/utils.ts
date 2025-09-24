import {isValidatorSymbol, UnknownValidatorFunction, ValidatorFunction} from "./types";
import {RawOptions} from "./raw";

export class SchemaError extends Error {
    private ctx: ValidatorContext;
    public readonly name: string = "SchemaError";

    public constructor(message: string, ctx: ValidatorContext) {
        const formatedMessage: string = ctx.hasPath
            ? `${ctx.path}: ${message}`
            : message;

        super(formatedMessage)

        this.ctx = ctx;
    }
}

export class ValidatorContext {
    private readonly _path: Array<string | number>;
    private readonly _existed: boolean = false;

    public constructor();
    public constructor(existed: boolean);
    public constructor(existed?: boolean) {
        this._path = [];
        this._existed = existed ?? true
    }

    public createChild(name: string | number, existed: boolean): ValidatorContext {
        const context = new ValidatorContext(existed);
        context._path.push(...this._path, name);

        return context;
    }

    public get path(): string {
        return this._path.join(".");
    }

    public get hasPath(): boolean {
        return this._path.length > 0;
    }

    public get existed(): boolean {
        return this._existed;
    }
}

export function isValidator(value: unknown): value is (...args: unknown[]) => UnknownValidatorFunction {
    return (value as any)[isValidatorSymbol] == true;
}