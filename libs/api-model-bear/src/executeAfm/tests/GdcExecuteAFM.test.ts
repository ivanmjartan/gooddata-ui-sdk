// (C) 2019-2020 GoodData Corporation
import { describe, it, expect } from "vitest";
import { InvalidInputTestCases } from "../../../__mocks__/typeGuards.js";
import {
    isAbsoluteDateFilter,
    isArithmeticMeasureDefinition,
    isAttributeElementsArray,
    isAttributeElementsByRef,
    isAttributeElementsByValue,
    isAttributeFilter,
    isAttributeLocatorItem,
    isAttributeSortItem,
    isDateFilter,
    isExpressionFilter,
    isLocalIdentifierQualifier,
    isMeasureLocatorItem,
    isMeasureSortItem,
    isMeasureValueFilter,
    isNegativeAttributeFilter,
    isObjIdentifierQualifier,
    isObjectUriQualifier,
    isPopMeasureDefinition,
    isPositiveAttributeFilter,
    isPreviousPeriodMeasureDefinition,
    isRankingFilter,
    isRelativeDateFilter,
    isSimpleMeasureDefinition,
} from "../GdcExecuteAFM.js";
import {
    relativeDateFilter,
    absoluteDateFilter,
    positiveAttributeFilter,
    negativeAttributeFilter,
    expressionFilter,
    measureValueFilter,
    identifierObjectQualifier,
    uriObjectQualifier,
    simpleMeasureDefinition,
    arithmeticMeasureDefinition,
    popMeasureDefinition,
    previousPeriodMeasureDefinition,
    attributeSortItem,
    measureSortItem,
    attributeLocatorItem,
    measureLocatorItem,
    rankingFilter,
    localIdentifierQualifier,
} from "./GdcExecuteAFM.fixtures.js";

describe("GdcExecuteAFM", () => {
    describe("isDateFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "relative date filter", relativeDateFilter],
            [true, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isDateFilter(input)).toBe(expectedResult);
        });
    });

    describe("isRelativeDateFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isRelativeDateFilter(input)).toBe(expectedResult);
        });
    });

    describe("isAbsoluteDateFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [true, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "ranking filter", rankingFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAbsoluteDateFilter(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [true, "positive attribute filter", positiveAttributeFilter],
            [true, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "ranking filter", rankingFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAttributeFilter(input)).toBe(expectedResult);
        });
    });

    describe("isPositiveAttributeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [true, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "ranking filter", rankingFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isPositiveAttributeFilter(input)).toBe(expectedResult);
        });
    });

    describe("isNegativeAttributeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [true, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "ranking filter", rankingFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isNegativeAttributeFilter(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureValueFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "ranking filter", rankingFilter],
            [true, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isMeasureValueFilter(input)).toBe(expectedResult);
        });
    });

    describe("isRankingFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
            [true, "ranking filter", rankingFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isRankingFilter(input)).toBe(expectedResult);
        });
    });

    describe("isExpressionFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [true, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isExpressionFilter(input)).toBe(expectedResult);
        });
    });

    const attributeElementsByRef = {
        uris: ["a", "b", "c"],
    };
    const valuesElementsByValue = {
        values: ["a", "b", "c"],
    };
    const valuesElementsArray = ["a", "b", "c"];

    describe("isAttributeElementsArray", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases.filter((testCase) => testCase[1] !== "array"),
            [true, "empty array", []],
            [false, "attribute elements by ref", attributeElementsByRef],
            [false, "attribute elements by value", valuesElementsByValue],
            [true, "attribute elements array", valuesElementsArray],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAttributeElementsArray(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeElementsByRef", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "attribute elements by ref", attributeElementsByRef],
            [false, "attribute elements by value", valuesElementsByValue],
            [false, "attribute elements array", valuesElementsArray],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAttributeElementsByRef(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeElementsByValue", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "attribute elements by ref", attributeElementsByRef],
            [true, "attribute elements by value", valuesElementsByValue],
            [false, "attribute elements array", valuesElementsArray],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAttributeElementsByValue(input)).toBe(expectedResult);
        });
    });

    describe("isObjectUriQualifier", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "identifier object qualifier", identifierObjectQualifier],
            [true, "uri object qualifier", uriObjectQualifier],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isObjectUriQualifier(input)).toBe(expectedResult);
        });
    });

    describe("isObjIdentifierQualifier", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "identifier object qualifier", identifierObjectQualifier],
            [false, "uri object qualifier", uriObjectQualifier],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isObjIdentifierQualifier(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "simple measure definition", simpleMeasureDefinition],
            [false, "arithmetic measure definition", arithmeticMeasureDefinition],
            [false, "pop measure definition", popMeasureDefinition],
            [false, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isSimpleMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isLocalIdentifierQualifier", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "identifier object qualifier", identifierObjectQualifier],
            [false, "uri object qualifier", uriObjectQualifier],
            [true, "local identifier qualifier", localIdentifierQualifier],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isLocalIdentifierQualifier(input)).toBe(expectedResult);
        });
    });

    describe("isArithmeticMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "simple measure definition", simpleMeasureDefinition],
            [true, "arithmetic measure definition", arithmeticMeasureDefinition],
            [false, "pop measure definition", popMeasureDefinition],
            [false, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isArithmeticMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isPopMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "simple measure definition", simpleMeasureDefinition],
            [false, "arithmetic measure definition", arithmeticMeasureDefinition],
            [true, "pop measure definition", popMeasureDefinition],
            [false, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isPopMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isPreviousPeriodMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "simple measure definition", simpleMeasureDefinition],
            [false, "arithmetic measure definition", arithmeticMeasureDefinition],
            [false, "pop measure definition", popMeasureDefinition],
            [true, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isPreviousPeriodMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeSortItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "attribute sort item", attributeSortItem],
            [false, "measure sort item", measureSortItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAttributeSortItem(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureSortItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "attribute sort item", attributeSortItem],
            [true, "measure sort item", measureSortItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isMeasureSortItem(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeLocatorItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "attribute locator item", attributeLocatorItem],
            [false, "measure locator item", measureLocatorItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isAttributeLocatorItem(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureLocatorItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "attribute locator item", attributeLocatorItem],
            [true, "measure locator item", measureLocatorItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(isMeasureLocatorItem(input)).toBe(expectedResult);
        });
    });
});
