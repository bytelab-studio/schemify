import {
    InferSchema,
    IsAcceptable,
    isValidatorSymbol,
    raw,
    RawOptions,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";
import {object, ObjectOptions} from "../primitive";

interface RecordOptions extends ObjectOptions {

}

type PropertyKeys = string | number | symbol;

export function record<
    K extends ValidatorFunction<RawOptions, unknown>,
    V extends ValidatorFunction<RawOptions, unknown>,
    Options extends RecordOptions>(key: K, property: V, options?: Options): ValidatorFunction<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>> {
    options = options ?? {} as Options;

    return raw((value: unknown, context: ValidatorContext): ValidatorReturn<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>> => {
        const obj: ValidatorReturn<Options, object> = object(options)(value, context);
        if (obj === null || obj === undefined) {
            return obj as ValidatorReturn<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>>;
        }

        for (const [k, v] of Object.entries(obj)) {
            const ctx: ValidatorContext = context.createChild(k, true);
            key(k, ctx);
            property(v, ctx);
        }

        return value as ValidatorReturn<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>>;
    });
}

record[isValidatorSymbol] = true;