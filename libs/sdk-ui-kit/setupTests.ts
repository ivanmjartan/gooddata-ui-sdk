// (C) 2023 GoodData Corporation
import matchers from "@testing-library/jest-dom";
import { expect, vi } from "vitest";

expect.extend(matchers);

// some tests need createRange function
document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = vi.fn();

    range.getClientRects = () => {
        return {
            item: () => null,
            length: 0,
            [Symbol.iterator]: vi.fn(),
        };
    };

    return range;
};
