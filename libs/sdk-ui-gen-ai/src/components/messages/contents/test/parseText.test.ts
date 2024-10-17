// (C) 2024 GoodData Corporation

import { describe, it, expect } from "vitest";
import { replaceLinks } from "../replaceLinks";
import { ISemanticSearchResultItem } from "@gooddata/sdk-model";

describe("parseText", () => {
    const foundObjects = [
        { type: "visualization", id: "foo", workspaceId: "baz", title: "Foo" } as ISemanticSearchResultItem,
        { type: "dashboard", id: "bar", workspaceId: "qux", title: "Bar" } as ISemanticSearchResultItem,
    ];

    it.each([
        [
            "Hello, {visualization.foo} and {dashboard.bar}!",
            "Hello, [Foo](/analyze/#/baz/foo/edit) and [Bar](/dashboards/#/workspace/qux/dashboard/bar)!",
        ],
        ["{visualization.foo}", "[Foo](/analyze/#/baz/foo/edit)"],
        ["{dashboard.bar} test", "[Bar](/dashboards/#/workspace/qux/dashboard/bar) test"],
        ["test {dashboard.bar}", "test [Bar](/dashboards/#/workspace/qux/dashboard/bar)"],
        ["Test test", "Test test"],
        ["{foo.bar}", "{foo.bar}"],
    ] as [string, string][])("should parse %s", (text: string, expected: string) => {
        expect(replaceLinks(text, foundObjects)).toEqual(expected);
    });
});