import type {BaseOptions, ValidatorFunction} from "../src";
import * as Schema from "../src";

/**
 * Mock function for {@link Schema.nested}
 * @param options
 */
export function nestedMock(options?: BaseOptions): ValidatorFunction<BaseOptions, unknown> {
    return Schema.nested({
        prop1: Schema.number()
    }, options);
}

/**
 * Mock function for {@link Schema.list}
 * @param options
 */
export function listMock(options?: BaseOptions): ValidatorFunction<BaseOptions, unknown> {
    return Schema.list(Schema.number(), options);
}

/**
 * Mock function for {@link Schema.tuple}
 * @param options
 */
export function tupleMock(options?: BaseOptions): ValidatorFunction<BaseOptions, unknown> {
    return Schema.tuple([Schema.number(), Schema.string(), Schema.number()], options);
}

/**
 * Mock function for {@link Schema.union}
 * @param options
 */
export function unionMock(options?: BaseOptions): ValidatorFunction<BaseOptions, unknown> {
    return Schema.union([
        Schema.string(),
        Schema.number()
    ], options);
}

export function literalMock(options?: BaseOptions): ValidatorFunction<BaseOptions, unknown> {
    return Schema.literal("literal", options);
}

export function wrapIfNeeded(validator: (...args: unknown[]) => ValidatorFunction<BaseOptions, unknown>): (options?: BaseOptions) => ValidatorFunction<BaseOptions, unknown> {
    if (validator == Schema.nested) {
        return nestedMock;
    }
    if (validator == Schema.list) {
        return listMock;
    }
    if (validator == Schema.tuple) {
        return tupleMock;
    }
    if (validator == Schema.union) {
        return unionMock;
    }
    if (validator == Schema.literal) {
        return literalMock;
    }

    return validator;
}

export function* getValidators(): Generator<(options?: BaseOptions) => ValidatorFunction<BaseOptions, unknown>> {
    for (const validatorBox of Object.values(Schema)) {
        if (!Schema.isValidator(validatorBox)) {
            continue;
        }
        if (validatorBox == Schema.raw) {
            continue;
        }

        yield wrapIfNeeded(validatorBox);
    }
}
