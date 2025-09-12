import {
    initValidatorFunction,
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";


export function never(): ValidatorFunction<{}, never> {
    const validator: ValidatorFunction<{}, never> = ((_: unknown, context: ValidatorContext): ValidatorReturn<{}, never> => {
        // Validators like Schema.nested pass undefined even when the value doesn't exist.
        // Therefore, we need to check if the value didn't exist. And act accordingly.
        if (!context.existed) {
            return undefined as never;
        }

        throw new SchemaError("Value is not allowed", context);
    }) as ValidatorFunction<{}, never>

    initValidatorFunction(validator);
    return validator;
}

never[isValidatorSymbol] = true;