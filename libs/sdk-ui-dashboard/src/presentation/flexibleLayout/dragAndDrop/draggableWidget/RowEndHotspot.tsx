// (C) 2007-2024 GoodData Corporation
import { IDashboardWidget } from "@gooddata/sdk-model";
import cx from "classnames";
import React from "react";

import { selectIsInEditMode, useDashboardSelector } from "../../../../model/index.js";
import { IDashboardLayoutItemFacade } from "../../../../_staging/dashboard/flexibleLayout/index.js";

import { Hotspot } from "./Hotspot.js";
import { updateItem } from "../../../../_staging/layout/coordinates.js";
import { WidgetDropZoneColumn } from "./WidgetDropZoneColumn.js";
import { useScreenSize } from "../../../dashboard/components/DashboardScreenSizeContext.js";
import { GridLayoutElement } from "../../DefaultDashboardLayoutRenderer/GridLayoutElement.js";
import { getRemainingWidthInRow } from "../../rowEndHotspotHelper.js";

export type RowEndHotspotProps<TWidget = IDashboardWidget> = {
    item: IDashboardLayoutItemFacade<TWidget>;
};

export const RowEndHotspot = (props: RowEndHotspotProps<unknown>) => {
    const { item } = props;

    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const screen = useScreenSize();
    const layoutPath = item.index();

    const isLastInSection = item.isLast();
    const showEndingHotspot = isLastInSection && isInEditMode;

    if (!showEndingHotspot) {
        return null;
    }

    const layoutPathForEndHotspot = updateItem(
        layoutPath,
        layoutPath[layoutPath.length - 1].sectionIndex,
        layoutPath[layoutPath.length - 1].itemIndex + 1,
    ); // increment item index manually as end hotspot is rendered as prev type

    const remainingGridWidth = getRemainingWidthInRow(item, screen);
    const { gridHeight } = item.sizeForScreenWithFallback(screen);

    const isDropZoneVisible = shouldShowRowEndDropZone(remainingGridWidth);

    return (
        <>
            <GridLayoutElement
                type="item"
                layoutItemSize={{
                    xl: { gridWidth: remainingGridWidth, gridHeight },
                    lg: { gridWidth: remainingGridWidth, gridHeight },
                    md: { gridWidth: remainingGridWidth, gridHeight },
                    sm: { gridWidth: remainingGridWidth, gridHeight },
                    xs: { gridWidth: remainingGridWidth, gridHeight },
                }}
                className={cx(
                    "gd-fluidlayout-column",
                    "gd-fluidlayout-column-dropzone",
                    "s-fluid-layout-column",
                    "gd-fluidlayout-column-row-end-hotspot",
                    {
                        "gd-fluidlayout-column-dropzone__text--hidden": remainingGridWidth < 2,
                    },
                )}
            >
                {isDropZoneVisible ? (
                    <WidgetDropZoneColumn
                        layoutPath={layoutPathForEndHotspot}
                        isLastInSection={true}
                        gridWidthOverride={remainingGridWidth}
                    />
                ) : null}
                <Hotspot
                    dropZoneType="prev"
                    isEndingHotspot
                    layoutPath={layoutPathForEndHotspot}
                    isLastInSection={item.isLast()}
                    hideBorder={isDropZoneVisible}
                />
            </GridLayoutElement>
        </>
    );
};

export const shouldShowRowEndDropZone = (remainingGridWidth: number) => remainingGridWidth > 0;
