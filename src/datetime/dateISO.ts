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
    let isFirstChar: boolean = true;

    while ((current = parser.next()) != null) {
        // -1 => only negative, 0 negative or positive, 1 only positive
        let prefixState: -1 | 0 | 1 = 0;

        if (isFirstChar) {
            isFirstChar = false;

            if (current == "+" || current == "-") {
                prefixState = current == "+" ? 1 : -1;
                current = parser.next();
                if (current != "Y") {
                    throw new SchemaError("Invalid format, expected '-YYYY' or '+YYYY'", new ValidatorContext());
                }
            }
        }

        switch (current) {
            case "Y":
                if (!parser.expectNext("Y") || !parser.expectNext("Y") || !parser.expectNext("Y")) {
                    throw new SchemaError("Invalid format, expected 'YYYY'", new ValidatorContext());
                }

                const prefix: string = prefixState == 0
                    ? "[+-]?"
                    : prefixState == 1
                        ? "[+]?"
                        : "-"

                extracted.push(`(${prefix}[0-9]{4})`);
                break;
            case "M":
                if (!parser.expectNext("M")) {
                    throw new SchemaError("Invalid format, expected 'MM'", new ValidatorContext());
                }

                extracted.push("(0[1-9]|1[0-2])");
                break;
            case "D":
                let pattern: string = "([1-7])";

                if (parser.lookupNext("D")) {
                    parser.next();
                    pattern = "(0[1-9]|[1-2][0-9]|3[0-1])";
                }

                if (parser.lookupNext("D")) {
                    parser.next();
                    pattern = "(001|[0-2][0-9]{2}|3[0-5][0-9]|36[0-6])";
                }

                extracted.push(pattern);
                break;
            case "W":
                if (!parser.expectNext("w") || !parser.expectNext("w")) {
                    throw new SchemaError("Invalid format, expected 'Www'", new ValidatorContext());
                }

                extracted.push("(W(0[1-9]|[1-4][0-9]|5[0-3]))");
                break;
            case "-":
                if (parser.lookupNext("-")) {
                    throw new SchemaError("Invalid format, expected '-', got '--'", new ValidatorContext());
                }

                extracted.push("-");
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

export interface DateISOOptions extends PatternOptions {
    format?: string;
}

export function dateISO<Options extends DateISOOptions>(options?: DateISOOptions): ValidatorFunction<Options, string> {
    options = options ?? {} as Options;

    const regexp: RegExp = options.format
        ? extractPattern(options.format)
        // YYYY-MM-DD format
        : /^([+-]?[0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;

    return raw((value: NonNullable<unknown>, context: ValidatorContext): ValidatorReturn<Options, string> => {
        return pattern(regexp, options)(value, context);
    }, dateISO, options);
}

export declare namespace dateISO {
    export function extractPattern(format: string, appendStartEndFlag?: boolean): RegExp;
}

dateISO.module = "datetime";
dateISO.extractPattern = extractPattern;
dateISO[isValidatorSymbol] = true;