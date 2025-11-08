import {
    initValidatorFunction,
    isValidatorSymbol,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn,
    pluginTools
} from "../core";

export function never(): ValidatorFunction<{}, never> {
    const validator: ValidatorFunction<{}, never> = ((_: unknown, context: ValidatorContext): ValidatorReturn<{}, never> => {
        for (const plug of pluginTools.getRuntimePlugins()) {
            pluginTools.executeRuntimePlugin(plug, validator as ValidatorFunction<{}, never>);
        }

        // Validators like Schema.nested pass undefined even when the value doesn't exist.
        // Therefore, we need to check if the value didn't exist. And act accordingly.
        if (!context.existed) {
            return undefined as never;
        }

        throw new SchemaError("Value is not allowed", context);
    }) as ValidatorFunction<{}, never>

    initValidatorFunction(validator, never, {});
    return validator;
}

never.module = "primitive";
never[isValidatorSymbol] = true;