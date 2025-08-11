import {isValidatorSymbol, ValidatorFunction} from "./types";
import {RawOptions} from "./raw";

export class SchemaError extends Error {
    private ctx: ValidatorContext;
    public readonly name: string = "SchemaError";

    public constructor(message: string, ctx: ValidatorContext) {
        const formatedMessage: string = ctx.hasPath()
            ? `${ctx.getPathString()}: ${message}`
            : message;

        super(formatedMessage)

        this.ctx = ctx;
    }
}

export class ValidatorContext {
    private path: Array<string | number> = [];

    public constructor() {

    }

    public pushPath(item: string | number): void {
        this.path.push(item);
    }

    public popPath(): void {
        this.path.pop();
    }

    public clone(): ValidatorContext {
        const context = new ValidatorContext();
        context.path = [...this.path];
        return context;
    }

    public getPathString(): string {
        return this.path.join(".");
    }

    public hasPath(): boolean {
        return this.path.length > 0;
    }
}

export function isValidator(value: unknown): value is (...args: unknown[]) => ValidatorFunction<RawOptions, unknown> {
    return (value as any)[isValidatorSymbol] == true;
}