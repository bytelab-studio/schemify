import * as Schema from "../../src";
import {describe, expect, test, vi} from "vitest";

const PLUGIN_DEFINITION: Schema.pluginTools.SchemifyPlugin = {
    name: "Test Plugin",
    onValidation() {
    },
    usePlugin() {
        
    }
}

const PLUGIN_SYMBOL: symbol = Schema.pluginTools.registerPlugin(PLUGIN_DEFINITION);
/*
describe("'plugin' validator", () => {
    test("'raw' executes plugins", () => {
        using spy = vi.spyOn(PLUGIN_DEFINITION, "onValidation").mockImplementation(() => {});
        console.log(spy);
        
        const validator = Schema.raw<{}, string>((v) => v as string);
        const v: string = validator.validate("foo");
        
        expect(v).toBe("foo");
        expect(spy).toBeCalled();
    });

    test("'never' executes plugins", () => {
        using spy = vi.spyOn(PLUGIN_DEFINITION, "onValidation").mockImplementation(() => {});
        
        const validator = Schema.never();
        
        expect(() => validator.validate("foo")).throws();
        expect(spy).toBeCalled();
    }); 
});
*/