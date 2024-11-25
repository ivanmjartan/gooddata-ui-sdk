// (C) 2019-2024 GoodData Corporation
import { IWidget } from "@gooddata/sdk-model";
import React, { useEffect, useMemo, useState } from "react";

import {
    resizeNestedLayoutItemWidth,
    selectInsightsMap,
    useDashboardDispatch,
    useDashboardSelector,
} from "../../../../model/index.js";
import { IDashboardLayoutItemFacade } from "../../../../_staging/dashboard/flexibleLayout/index.js";
import { getMinWidth } from "../../../../_staging/layout/sizing.js";
import { getDashboardLayoutItemMaxGridWidth } from "../../DefaultDashboardLayoutRenderer/index.js";
import { getSizeAndXCoords } from "../DragLayerPreview/WidthResizerDragPreview.js";
import { useDashboardDrag, useResizeHandlers, useResizeWidthItemStatus } from "../../../dragAndDrop/index.js";
import { WidthResizer } from "./WidthResizer.js";
import { useScreenSize } from "../../../dashboard/components/DashboardScreenSizeContext.js";

export type WidthResizerHotspotProps = {
    item: IDashboardLayoutItemFacade<unknown>;
    getGridColumnHeightInPx: () => number;
    getGridColumnWidth: () => number;
    getLayoutDimensions: () => DOMRect;
};

export function WidthResizerHotspot({
    item,
    getGridColumnWidth,
    getGridColumnHeightInPx,
    getLayoutDimensions,
}: WidthResizerHotspotProps) {
    const dispatch = useDashboardDispatch();
    const insightsMap = useDashboardSelector(selectInsightsMap);
    const { resizeStart, resizeEnd, getScrollCorrection } = useResizeHandlers();
    const screen = useScreenSize();

    const widget = useMemo(() => item.widget() as IWidget, [item]);
    const widgetIdentifier = widget.identifier;
    const { isWidthResizing, isActive } = useResizeWidthItemStatus(widgetIdentifier);

    const [isResizerVisible, setResizerVisibility] = useState<boolean>(false);
    const onMouseEnter = () => setResizerVisibility(true);
    const onMouseLeave = () => setResizerVisibility(false);
    const layoutPath = item.index();

    const currentWidth = item.sizeForScreen(screen)!.gridWidth;
    const minLimit = getMinWidth(widget, insightsMap);
    const maxLimit = getDashboardLayoutItemMaxGridWidth(item, screen);

    const [{ isDragging }, dragRef] = useDashboardDrag(
        {
            dragItem: () => {
                const initialLayoutDimensions = getLayoutDimensions();
                return {
                    type: "internal-width-resizer",
                    layoutPath,
                    sectionIndex: -1, // only for type compatibility reasons, will not be used
                    itemIndex: -1, // only for type compatibility reasons, will not be used
                    gridColumnHeightInPx: getGridColumnHeightInPx(),
                    gridColumnWidth: getGridColumnWidth(),
                    initialLayoutDimensions,
                    currentWidth,
                    minLimit,
                    maxLimit,
                };
            },
            dragEnd: (dragItem, monitor) => {
                const scrollCorrection = getScrollCorrection();

                const { limitedSize } = getSizeAndXCoords(
                    dragItem,
                    monitor.getInitialClientOffset()!.x,
                    monitor.getDifferenceFromInitialOffset()!.x,
                    scrollCorrection.x,
                );

                dispatch(resizeNestedLayoutItemWidth(layoutPath, limitedSize));
                setResizerVisibility(false);
            },
        },

        [widget, insightsMap, layoutPath, currentWidth, minLimit, maxLimit],
    );

    useEffect(() => {
        if (isDragging) {
            resizeStart("width", [widgetIdentifier], getLayoutDimensions);
        } else {
            resizeEnd();
        }
    }, [isDragging]);

    const isThisResizing = isWidthResizing && isActive;

    const showHotspot = !isDragging || isWidthResizing || isResizerVisible;
    const showResizer = isResizerVisible || isThisResizing;
    const status = isDragging ? "muted" : "active";

    if (!showHotspot) {
        return null;
    }

    return (
        <div className="dash-width-resizer-container">
            <div
                className="dash-width-resizer-hotspot s-dash-width-resizer-hotspot"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={dragRef}
            >
                {showResizer ? <WidthResizer status={status} /> : null}
            </div>
        </div>
    );
}