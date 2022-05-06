// (C) 2021-2022 GoodData Corporation
import { IPieChartProps } from "@gooddata/sdk-ui-charts";
import { BucketNames } from "@gooddata/sdk-ui";

import {
    IVisualizationDescriptor,
    IVisualizationMeta,
    PluggableVisualizationFactory,
} from "../../../interfaces/VisualizationDescriptor";
import { PluggablePieChart } from "./PluggablePieChart";
import { BaseChartDescriptor } from "../baseChart/BaseChartDescriptor";
import {
    filtersInsightConversion,
    getInsightToPropsConverter,
    getReactEmbeddingCodeGenerator,
    IImportInfo,
    multipleAttributesOrMeasuresBucketConversion,
    singleAttributeBucketConversion,
    sortsInsightConversion,
} from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";

const component: IImportInfo = {
    importType: "named",
    name: "PieChart",
    package: "@gooddata/sdk-ui-charts",
};
export class PieChartDescriptor extends BaseChartDescriptor implements IVisualizationDescriptor {
    public getFactory(): PluggableVisualizationFactory {
        return (params) => new PluggablePieChart(params);
    }

    public getEmbeddingCode = getReactEmbeddingCodeGenerator({
        component: component,
        insightToProps: getInsightToPropsConverter<IPieChartProps>({
            measures: multipleAttributesOrMeasuresBucketConversion("measures", BucketNames.MEASURES),
            viewBy: singleAttributeBucketConversion("viewBy", BucketNames.VIEW),
            filters: filtersInsightConversion("filters"),
            sortBy: sortsInsightConversion("sortBy"),
            config: chartConfigInsightConversion("config"),
        }),
        additionalFactories: chartAdditionalFactories(),
    });

    public getMeta(): IVisualizationMeta {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/pie_chart_component.html",
            supportsExport: true,
            componentInfo: {
                name: component.name,
                package: component.package,
            },
        };
    }
}
