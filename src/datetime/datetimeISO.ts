import {dateISO} from "./dateISO";
import {timeISO} from "./timeISO";
import {isValidatorSymbol, raw, SchemaError, ValidatorContext, ValidatorFunction} from "../core";
import {SimpleStringParser} from "./parser";
import {pattern, PatternOptions} from "../complex";

function extractPatternParts(format: string): [RegExp, RegExp, RegExp | null] {
    const [date, time] = format.split("T");
    const dateRegexp: RegExp = dateISO.extractPattern(date, false);

    const timeParts: string[] = time.split(/([Z+\-)])/);
    if (timeParts.length == 1) {
        const timeRegexp: RegExp = timeISO.extractPattern(time, false);
        return [dateRegexp, timeRegexp, null];
    }
    if (timeParts.length > 3) {
        throw new SchemaError("Invalid format: Multiple offset delimiter was found", new ValidatorContext());
    }

    const timeRegexp: RegExp = timeISO.extractPattern(timeParts[0], false);
    const offsetKind: string = timeParts[1];

    if (offsetKind == "Z") {
        return [dateRegexp, timeRegexp, new RegExp("Z")];
    }

    const extracted: string[] = [];
    const parser: SimpleStringParser = new SimpleStringParser(timeParts[2]);
    let current: string | null;

    while ((current = parser.next()) != null) {
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
            case ":":
                if (parser.lookupNext(":")) {
                    throw new SchemaError("Invalid format, expected ':', got '::'", new ValidatorContext());
                }

                extracted.push(":");
                break;
            default:
                throw new SchemaError(`Invalid format, unexpected '${current}'`, new ValidatorContext());
        }
    }
    const pattern: string = extracted.join("");
    const offsetRegex: RegExp = new RegExp(`\\${offsetKind}${pattern}`);
    return [dateRegexp, timeRegexp, offsetRegex];
}

function extractPattern(format: string, appendStartEndFlag: boolean = true): RegExp {
    const [date, time, offset] = extractPatternParts(format);

    const regexString: string = offset
        ? `(${date.source})T(${time.source})(${offset.source})`
        : `(${date.source})T(${time.source})`;

    return appendStartEndFlag
        ? new RegExp(`^${regexString}$`)
        : new RegExp(`${regexString}`);
}

export interface DatetimeISO extends PatternOptions {
    format?: string;
}

export function datetimeISO<Options extends DatetimeISO>(options?: Options): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    const regexp: RegExp = options.format
        ? extractPattern(options.format)
        // YYYY-MM-DDThh:mm:ss format
        : /^(([+-]?[0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))T(([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9]|60))$/;

    return raw((value: NonNullable<unknown>, context: ValidatorContext) => {
        return pattern(regexp, options)(value, context);
    }, options);
}

datetimeISO[isValidatorSymbol] = true;