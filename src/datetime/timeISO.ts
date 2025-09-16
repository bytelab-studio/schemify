import {
    isValidatorSymbol,
    raw,
    SchemaError,
    ValidatorContext,
    ValidatorFunction,
    ValidatorReturn
} from "../core";
import {pattern, PatternOptions} from "../complex";
import {SimpleStringParser} from "./parser";

function extractPattern(format: string, appendStartEndFlag: boolean = true): RegExp {
    const extracted: string[] = [];
    const parser: SimpleStringParser = new SimpleStringParser(format);

    let current: string | null;
    while ((current = parser.next()) != null) {
        let commaType: string | null;

        switch (current) {
            case "h":
                if (!parser.expectNext("h")) {
                    throw new SchemaError("Invalid format, expected 'hh'", new ValidatorContext());
                }

                extracted.push("([0-1][0-9]|2[0-4])");
                break;
            case "m":
                if (!parser.expectNext("m")) {
                    throw new SchemaError("Invalid format, expected 'mm'", new ValidatorContext());
                }

                extracted.push("([0-5][0-9])");
                break;
            case "s":
                if (!parser.expectNext("s")) {
                    throw new SchemaError("Invalid format, expected 'ss'", new ValidatorContext());
                }

                extracted.push("([0-5][0-9]|60)");
                break;
            case ":":
                if (parser.lookupNext(":")) {
                    throw new SchemaError("Invalid format, expected ':', got '::'", new ValidatorContext());
                }

                extracted.push(":");
                break;
            case ",":
                commaType = ",";
            case ".":
                commaType ??= "\\.";

                if (!parser.expectNext("f")) {
                    throw new SchemaError("Invalid format, expected '.f' or ',f'", new ValidatorContext());
                }

                extracted.push(`(${commaType}[0-9]{0,})`);
                break;
            default:
                throw new SchemaError(`Invalid format, unexpected '${current}'`, new ValidatorContext());
        }
    }

    const pattern: string = extracted.join("");

    return appendStartEndFlag
        ? new RegExp(`^${pattern}$`)
        : new RegExp(`${pattern}`);
}

export interface TimeISOOptions extends PatternOptions {
    format?: string;
}

export function timeISO<Options extends TimeISOOptions>(options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    const regexp: RegExp = options.format
        ? extractPattern(options.format)
        // hh:mm:ss format
        : /^([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]|60)$/;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, string> => {
         return pattern(regexp, options)(value, context);
    }, options);
}

export declare namespace timeISO {
    export function extractPattern(format: string, appendStartEndFlag?: boolean): RegExp;
}

timeISO.extractPattern = extractPattern;
timeISO[isValidatorSymbol] = true;