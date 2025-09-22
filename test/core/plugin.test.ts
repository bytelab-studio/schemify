import * as Schema from "../../src";
import {describe, expect, test, vi} from "vitest";

const PLUGIN_NAME: string = "test-plugin";

const PLUGIN_DEFINITION: Schema.pluginTools.SchemifyPlugin<[]> = {
    name: PLUGIN_NAME,
    onValidation() {
    },
    usePlugin() {
    }
}

const [_, PLUGIN_ACTIVATOR] = Schema.pluginTools.registerPlugin(PLUGIN_DEFINITION);

describe("plugin system", () => {
    test("'raw' executes plugins", () => {
        using spy = vi.spyOn(PLUGIN_DEFINITION, "onValidation");

        const validator = Schema.raw<{}, string>((v) => v as string);
        const v: string = validator.validate("foo");

        expect(v).toBe("foo");
        expect(spy).toBeCalled();
    });

    test("'never' executes plugins", () => {
        using spy = vi.spyOn(PLUGIN_DEFINITION, "onValidation");
        
        const validator = Schema.never();
        
        expect(() => validator.validate("foo")).throws();
        expect(spy).toBeCalled();
    });

    test("data containers", () => {
        const PLUGIN_DEFINITION: Schema.pluginTools.SchemifyPlugin<[]> = {
            name: "test-data-containers",
            usePlugin(validator) {
                expect(this.hasData(PLUGIN_SYMBOL, validator, "test-data")).toBe(false);
                expect(this.getData(PLUGIN_SYMBOL, validator, "test-data")).toBe(null);
                this.setData(PLUGIN_SYMBOL, validator, "test-data", 123)
                expect(this.getData(PLUGIN_SYMBOL, validator, "test-data")).toBe(123);
                expect(this.hasData(PLUGIN_SYMBOL, validator, "test-data")).toBe(true);
            }
        }
        const [PLUGIN_SYMBOL, ACTIVATOR] = Schema.pluginTools.registerPlugin(PLUGIN_DEFINITION);
        using spy = vi.spyOn(PLUGIN_DEFINITION, "usePlugin");

        Schema.plugin(Schema.any(), ACTIVATOR());

        expect(spy).toBeCalled();
    });

    test("cannot register plugin twice", () => {
        expect(() => Schema.pluginTools.registerPlugin(PLUGIN_DEFINITION)).throws();
    });

    test("'plugin' executes plugins", () => {
        using spy = vi.spyOn(PLUGIN_DEFINITION, "usePlugin");

        Schema.plugin(Schema.any(), PLUGIN_ACTIVATOR());

        expect(spy).toBeCalled();

        expect(() => Schema.plugin(Schema.any(), () => ({name: "no-existing-plugin", arguments: []}))).not.throws();
    });

    test("'plugin' with empty array executes no plugins", () => {
        using spy = vi.spyOn(PLUGIN_DEFINITION, "usePlugin");

        Schema.plugin(Schema.any());

        expect(spy).not.toBeCalled();
    });
});
