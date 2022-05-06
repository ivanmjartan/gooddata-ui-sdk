// (C) 2021-2022 GoodData Corporation
import { IComboChartProps } from "@gooddata/sdk-ui-charts";
import { BucketNames } from "@gooddata/sdk-ui";

import {
    IVisualizationDescriptor,
    IVisualizationMeta,
    PluggableVisualizationFactory,
} from "../../../interfaces/VisualizationDescriptor";
import { PluggableComboChart } from "./PluggableComboChart";
import { BigChartDescriptor } from "../BigChartDescriptor";
import {
    getReactEmbeddingCodeGenerator,
    getInsightToPropsConverter,
    filtersInsightConversion,
    sortsInsightConversion,
    multipleMeasuresBucketConversion,
    multipleAttributesBucketConversion,
    IImportInfo,
} from "../../../utils/embeddingCodeGenerator";
import { chartAdditionalFactories, chartConfigInsightConversion } from "../chartCodeGenUtils";

const component: IImportInfo = {
    importType: "named",
    name: "ComboChart",
    package: "@gooddata/sdk-ui-charts",
};
export class ComboChartDescriptor extends BigChartDescriptor implements IVisualizationDescriptor {
    public getFactory(): PluggableVisualizationFactory {
        return (params) => new PluggableComboChart(params);
    }

    public getEmbeddingCode = getReactEmbeddingCodeGenerator({
        component: component,
        insightToProps: getInsightToPropsConverter<IComboChartProps>({
            primaryMeasures: multipleMeasuresBucketConversion("primaryMeasures", BucketNames.MEASURES),
            secondaryMeasures: multipleMeasuresBucketConversion(
                "secondaryMeasures",
                BucketNames.SECONDARY_MEASURES,
            ),
            viewBy: multipleAttributesBucketConversion("viewBy", BucketNames.VIEW),
            filters: filtersInsightConversion("filters"),
            sortBy: sortsInsightConversion("sortBy"),
            config: chartConfigInsightConversion("config"),
        }),
        additionalFactories: chartAdditionalFactories(),
    });

    public getMeta(): IVisualizationMeta {
        return {
            documentationUrl: "https://sdk.gooddata.com/gooddata-ui/docs/combo_chart_component.html",
            supportsExport: true,
            componentInfo: {
                name: component.name,
                package: component.package,
            },
        };
    }
}
