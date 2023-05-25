// (C) 2020 GoodData Corporation

import { convertDimensions } from "../ExecutionResultConverter.js";
import { dimensions } from "./ExecutionResultConverter.fixtures.js";

describe("convertDimensions", () => {
    it("should add ref properties as uriRefs", () => {
        expect(convertDimensions(dimensions)).toMatchSnapshot();
    });
});
