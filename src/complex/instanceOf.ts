import {
    isValidatorSymbol,
    raw,
    RawOptions,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";

export interface InstanceOfOptions extends RawOptions {

}

type Constructor = new (...args: any[]) => any;

export function instanceOf<
    Class extends Constructor,
    Options extends InstanceOfOptions
>(constructor: Class, options?: Options): ValidatorFunction<Options, InstanceType<Class>> {
    options = options ?? {} as Options;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, InstanceType<Class>> => {
        if (typeof value != "object" || !(value instanceof constructor)) {
            throw new SchemaError(`Value is not a instance of '${constructor.name}'`, context);
        }

        return value as InstanceType<Class>;
    }, options);
}

instanceOf[isValidatorSymbol] = true;