import {
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";


export function never(): ValidatorFunction<{}, never> {
    return raw((_: unknown, context: ValidatorContext): ValidatorReturn<{}, never> => {
        // Validators like Schema.nested pass undefined even when the value doesn't exist.
        // Therefore, we need to check if the value didn't exist. And act accordingly.
        if (!context.existed) {
            return undefined as never;
        }

        throw new SchemaError("Value is not allowed", context);
    });
}

never[isValidatorSymbol] = true;