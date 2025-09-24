import {
    InferSchema,
    IsAcceptable,
    isValidatorSymbol,
    raw,
    RawOptions,
    UnknownValidatorFunction,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";
import {object, ObjectOptions} from "../primitive";

export interface RecordOptions extends ObjectOptions {

}

type PropertyKeys = string | number | symbol;

export function record<
    K extends UnknownValidatorFunction,
    V extends UnknownValidatorFunction,
    Options extends RecordOptions>(key: K, property: V, options?: Options): ValidatorFunction<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>> => {
        const obj: ValidatorReturn<Options, object> = object(options)(value, context);

        for (const [k, v] of Object.entries(obj!)) {
            const ctx: ValidatorContext = context.createChild(k, true);
            key(k, ctx);
            property(v, ctx);
        }

        return value as ValidatorReturn<Options, Record<IsAcceptable<InferSchema<K>, PropertyKeys>, InferSchema<V>>>;
    }, record, options);
}

record[isValidatorSymbol] = true;