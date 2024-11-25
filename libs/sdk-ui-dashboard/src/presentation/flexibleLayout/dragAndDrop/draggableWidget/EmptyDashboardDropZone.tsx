// (C) 2022-2024 GoodData Corporation
import React, { ReactNode, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import cx from "classnames";
import { Typography } from "@gooddata/sdk-ui-kit";

import { BaseDraggableLayoutItem, DraggableItemType } from "../../../dragAndDrop/types.js";
import { useDashboardComponentsContext } from "../../../dashboardContexts/index.js";
import { useEmptyContentHandlers } from "./useEmptyContentHandlers.js";
import { GridLayoutElement } from "../../DefaultDashboardLayoutRenderer/index.js";
import { getDashboardLayoutItemHeightForGrid } from "../../../../_staging/layout/sizing.js";

const widgetCategoryMapping: Partial<{ [D in DraggableItemType]: string }> = {
    "insight-placeholder": "insight",
    insightListItem: "visualization",
    "kpi-placeholder": "kpi",
    richTextListItem: "richText",
    visualizationSwitcherListItem: "visualizationSwitcher",
    dashboardLayoutListItem: "dashboardLayout",
};

export const EmptyDashboardDropZone: React.FC = () => {
    const { EmptyLayoutDropZoneBodyComponent } = useDashboardComponentsContext();

    const sectionPath = {
        parent: undefined,
        sectionIndex: 0,
    };

    const { item, itemType, canDrop, isOver, dropRef } = useEmptyContentHandlers(sectionPath);

    const { gridWidth = 12, gridHeight } = (item as BaseDraggableLayoutItem)?.size || {};
    const layoutItemSize = useMemo(
        () => ({
            xl: { gridWidth, gridHeight },
            lg: { gridWidth, gridHeight },
            md: { gridWidth, gridHeight },
            sm: { gridWidth, gridHeight },
            xs: { gridWidth, gridHeight },
        }),
        [gridWidth, gridHeight],
    );

    const widgetCategory = widgetCategoryMapping[itemType];
    const message =
        widgetCategory === "visualization" || widgetCategory === "kpi" ? (
            <FormattedMessage id="newDashboard.dropInsight" />
        ) : (
            <FormattedMessage
                id="dropzone.widget.desc"
                values={{ b: (chunks: ReactNode) => <b>{chunks}</b> }}
            />
        );

    return (
        <GridLayoutElement
            type={"root"}
            layoutItemSize={{
                xl: { gridWidth: 12, gridHeight },
                lg: { gridWidth: 12, gridHeight },
                md: { gridWidth: 12, gridHeight },
                sm: { gridWidth: 12, gridHeight },
                xs: { gridWidth: 12, gridHeight },
            }}
            className="gd-empty-dashboard-dropzone"
        >
            <GridLayoutElement
                type={"item"}
                layoutItemSize={layoutItemSize}
                className={cx("drag-info-placeholder", "dash-item", {
                    [`type-${widgetCategory}`]: !!widgetCategory,
                    "type-none": !widgetCategory,
                    "s-last-drop-position": canDrop,
                })}
                style={{
                    minHeight: gridHeight ? getDashboardLayoutItemHeightForGrid(gridHeight) : undefined,
                }}
            >
                <div
                    className={cx("drag-info-placeholder-inner", { "can-drop": canDrop, "is-over": isOver })}
                    ref={dropRef}
                >
                    <EmptyLayoutDropZoneBodyComponent />
                    <div className="drag-info-placeholder-drop-target s-drag-info-placeholder-drop-target">
                        <div className="drop-target-inner">
                            <Typography
                                tagName="p"
                                className={cx("drop-target-message", `${widgetCategory}-drop-target`)}
                            >
                                {message}
                            </Typography>
                        </div>
                    </div>
                </div>
            </GridLayoutElement>
        </GridLayoutElement>
    );
};