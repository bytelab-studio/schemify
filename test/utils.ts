import type {RawOptions, UnknownValidatorFunction} from "../src";
import * as Schema from "../src";

/**
 * Mock function for {@link Schema.nested}
 * @param options
 */
export function nestedMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.nested({
        prop1: Schema.number()
    }, options);
}

/**
 * Mock function for {@link Schema.list}
 * @param options
 */
export function listMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.list(Schema.number(), options);
}

/**
 * Mock function for {@link Schema.tuple}
 * @param options
 */
export function tupleMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.tuple([Schema.number(), Schema.string(), Schema.number()], options);
}

/**
 * Mock function for {@link Schema.union}
 * @param options
 */
export function unionMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.union([
        Schema.string(),
        Schema.number()
    ], options);
}

/**
 * Mock function for {@link Schema.literal}
 * @param options
 */
export function literalMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.literal("literal", options);
}

/**
 * Mock function for {@link Schema.oneOf}
 * @param options
 */
export function oneOfMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.oneOf(["literal", "literal2"], options);
}

export enum Enum {
    A = "enumA",
    B = "enumB"
}

/**
 * Mock function for {@link Schema.oneOf.enumValues}
 * @param options
 */
export function oneOfEnumMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.oneOf.enumValues(Enum, options);
}

/**
 * Mock function for {@link Schema.pattern}
 * @param options
 */
export function patternMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.pattern(/pattern/, options);
}

/**
 * Mock function for {@link Schema.record}
 * @param options
 */
export function recordMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.record(Schema.string(), Schema.string(), options);
}

export function instanceOfMock(options?: RawOptions): UnknownValidatorFunction {
    return Schema.instanceOf(Date, options);
}

export function wrapIfNeeded(validator: (...args: unknown[]) => UnknownValidatorFunction): (options?: RawOptions) => UnknownValidatorFunction {
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
    if (validator == Schema.oneOf.enumValues) {
        return oneOfEnumMock;
    }
    if (validator == Schema.pattern) {
        return patternMock;
    }
    if (validator == Schema.record) {
        return recordMock;
    }
    if (validator == Schema.instanceOf) {
        return instanceOfMock;
    }

    return validator;
}

export function* getValidators(base: object = Schema): Generator<(options?: RawOptions) => UnknownValidatorFunction> {
    for (const validatorBox of Object.values(base)) {
        if (!Schema.isValidator(validatorBox)) {
            continue;
        }
        if (validatorBox == Schema.raw) {
            continue;
        }

        yield wrapIfNeeded(validatorBox);

        yield* getValidators(validatorBox);
    }
}
