// (C) 2007-2020 GoodData Corporation
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { HeatmapLegend, IHeatmapLegendProps } from "../HeatmapLegend";
import { IHeatmapLegendItem, IHeatmapLegendSize } from "../types";

describe("HeatmapLegend", () => {
    function renderLegend(props: IHeatmapLegendProps): ReactWrapper {
        return mount(<HeatmapLegend {...props} />);
    }

    const numericSymbols = ["k", "M", "G"];
    const series = [
        {
            color: "abc",
            legendIndex: 0,
            range: {
                from: 1,
                to: 2,
            },
        },
        {
            color: "def",
            legendIndex: 1,
            range: {
                from: 4,
                to: 5,
            },
        },
    ];

    it.each([
        ["small", series, numericSymbols, "top"],
        ["medium", series, numericSymbols, "top"],
        ["large", series, numericSymbols, "top"],
    ])(
        "should render legend when size is %s",
        (
            size: IHeatmapLegendSize,
            series: IHeatmapLegendItem[],
            numericSymbols: string[],
            position: string,
        ) => {
            const wrapper = renderLegend({ series, numericSymbols, size, position });

            expect(wrapper.find(".color-legend").length).toEqual(1);
        },
    );
});
