import type {RawOptions, ValidatorFunction} from "../src";
import * as Schema from "../src";

/**
 * Mock function for {@link Schema.nested}
 * @param options
 */
export function nestedMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.nested({
        prop1: Schema.number()
    }, options);
}

/**
 * Mock function for {@link Schema.list}
 * @param options
 */
export function listMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.list(Schema.number(), options);
}

/**
 * Mock function for {@link Schema.tuple}
 * @param options
 */
export function tupleMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.tuple([Schema.number(), Schema.string(), Schema.number()], options);
}

/**
 * Mock function for {@link Schema.union}
 * @param options
 */
export function unionMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.union([
        Schema.string(),
        Schema.number()
    ], options);
}

/**
 * Mock function for {@link Schema.literal}
 * @param options
 */
export function literalMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.literal("literal", options);
}

/**
 * Mock function for {@link Schema.oneOf}
 * @param options
 */
export function oneOfMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.oneOf(["literal", "literal2"], options);
}

export enum Enum {
    A = "literal",
    B = "literal2"
}

/**
 * Mock function for {@link Schema.oneOf.enumValues}
 * @param options
 */
export function oneOfEnumMock(options?: RawOptions): ValidatorFunction<RawOptions, unknown> {
    return Schema.oneOf.enumValues(Enum, options);
}

export function wrapIfNeeded(validator: (...args: unknown[]) => ValidatorFunction<RawOptions, unknown>): (options?: RawOptions) => ValidatorFunction<RawOptions, unknown> {
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
    if (validator == Schema.oneOf) {
        return oneOfMock;
    }

    return validator;
}

export function* getValidators(): Generator<(options?: RawOptions) => ValidatorFunction<RawOptions, unknown>> {
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
