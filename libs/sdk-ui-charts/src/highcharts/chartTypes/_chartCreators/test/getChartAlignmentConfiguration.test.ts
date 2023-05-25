// (C) 2019-2020 GoodData Corporation
import { getChartAlignmentConfiguration } from "../getChartAlignmentConfiguration.js";
import { TOP } from "../../../constants/alignments.js";
import { IChartConfig } from "../../../../interfaces/index.js";

describe("getChartAlignmentConfiguration", () => {
    it("should return chart alignment", () => {
        const chartConfig: Partial<IChartConfig> = getChartAlignmentConfiguration(null, null, {
            chart: {
                verticalAlign: TOP,
            },
        });
        expect(chartConfig).toEqual({
            chart: {
                verticalAlign: "top",
            },
        });
    });

    it("should return empty chart alignment", () => {
        const chartConfig: Partial<IChartConfig> = getChartAlignmentConfiguration(null, null, {});
        expect(chartConfig).toEqual({
            chart: undefined,
        });
    });
});
