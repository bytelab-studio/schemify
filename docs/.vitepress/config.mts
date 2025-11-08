import * as fs from "fs";
import * as path from "path";

declare const __dirname: string;

declare module path {
    export function join(...parts: string[]): string;

    export function parse(filename: string): {
        name: string;
        ext: string;
        base: string
    };
}

declare module fs {
    export function readdirSync(dir: string): string[];
}

import {type DefaultTheme, defineConfig} from "vitepress";
import SidebarItem = DefaultTheme.SidebarItem;

function generateModuleItems(module: string): SidebarItem[] {
    const ignoreList: string[] = ["index.md"];
    const base: string = path.join(__dirname, "..", "modules", module);
    const items: string[] = fs.readdirSync(base);
    const sidebarItems: SidebarItem[] = items
        .filter(item => !ignoreList.includes(item))
        .sort((a, b) => a > b ? 1 : -1)
        .map(item => path.parse(item))
        .map(item => ({
        text: `Schema.${item.name}`,
        link: `/modules/${module}/${item.name}`
    }));
    console.log(sidebarItems);
    return sidebarItems;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Schemify",
    description: "A VitePress Site",
    head: [
        ["link", { rel: "icon", href: "/assets/logo.png", type: "image/png", sizes: "any" }],
    ],
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: "local"
        },
        nav: [
            {
                text: "Home",
                link: "/"
            },
            {
                text: "Get Started",
                link: "/getting-started"
            },
            {
                text: "Modules",
                link: "/modules/"
            }
        ],

        sidebar: [
            {
                items: [
                    { text: "Getting Started", link: "/getting-started" },
                    { text: "Modules", link: "/modules/" }
                ]
            },
            {
                text: "Extend",
                items: [
                    { text: "Plugins", link: "/plugins" }
                ]
            },
            {
                text: "Core",
                link: "/modules/core/",
                items: [
                    { text: 'Schema.raw', link: '/modules/core/raw' },
                    { text: 'Schema.plugin', link: '/modules/core/plugin' },
                    { text: 'SchemaError', link: '/modules/core/schemaError' },
                    { text: 'ValidatorContext', link: '/modules/core/validatorContext' },
                    { text: "reflection", link: "/modules/core/reflection" }
                ]
            },
            {
                text: "Primitive",
                link: "/modules/primitive/",
                items: [
                    { text: 'Schema.any', link: '/modules/primitive/any' },
                    { text: 'Schema.array', link: '/modules/primitive/array' },
                    { text: 'Schema.bigint', link: '/modules/primitive/bigint' },
                    { text: 'Schema.boolean', link: '/modules/primitive/boolean' },
                    { text: 'Schema.callable', link: '/modules/primitive/callable' },
                    { text: 'Schema.never', link: '/modules/primitive/never' },
                    { text: 'Schema.nil', link: '/modules/primitive/nil' },
                    { text: 'Schema.number', link: '/modules/primitive/number' },
                    { text: 'Schema.object', link: '/modules/primitive/object' },
                    { text: 'Schema.regexp', link: '/modules/primitive/regexp' },
                    { text: 'Schema.string', link: '/modules/primitive/string' },
                    { text: 'Schema.symbol', link: '/modules/primitive/symbol' },
                    { text: 'Schema.undef', link: '/modules/primitive/undef' },
                    { text: 'Schema.unknown', link: '/modules/primitive/unknown' }
                ]
            },
            {
                text: "Complex",
                link: "/modules/complex/",
                items: [
                    { text: 'Schema.instanceOf', link: '/modules/complex/instanceOf' },
                    { text: 'Schema.list', link: '/modules/complex/list' },
                    { text: 'Schema.literal', link: '/modules/complex/literal' },
                    { text: 'Schema.nested', link: '/modules/complex/nested' },
                    {
                        text: 'Schema.oneOf.enumValues',
                        link: '/modules/complex/oneOf.enumValues'
                    },
                    { text: 'Schema.oneOf', link: '/modules/complex/oneOf' },
                    { text: 'Schema.pattern', link: '/modules/complex/pattern' },
                    { text: 'Schema.record', link: '/modules/complex/record' },
                    { text: 'Schema.tuple', link: '/modules/complex/tuple' },
                    { text: 'Schema.union', link: '/modules/complex/union' }
                ]
            },
            {
                text: "Datetime",
                link: "/modules/datetime/",
                items: [
                    { text: 'Schema.dateISO', link: '/modules/datetime/dateISO' },
                    { text: 'Schema.timeISO', link: '/modules/datetime/timeISO' },
                    { text: 'Schema.datetimeISO', link: '/modules/datetime/datetimeISO' }
                ]
            }
        ],

        footer: {
            message: `<a href="https://bytelab.studio/imprint" target="_blank">Imprint</a> <a href="https://bytelab.studio/privacy" target="_blank">Privacy Policy</a>`,
            copyright: `Copyright (c) ${new Date().getFullYear()} Bytelab Studio`
        },

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/bytelab-studio/schemify"
            },
            {
                icon: "codecov",
                link: "https://app.codecov.io/github/bytelab-studio/schemify"
            }
        ]
    },
    markdown: {
        theme: {
            light: "catppuccin-latte",
            dark: "catppuccin-macchiato"

        }
    }
})
