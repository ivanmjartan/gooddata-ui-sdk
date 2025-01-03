// (C) 2020-2024 GoodData Corporation
import React, { useMemo, useCallback, useEffect, useState } from "react";
import cx from "classnames";
import { useIntl } from "react-intl";
import { IInsight, widgetTitle, insightVisualizationType } from "@gooddata/sdk-model";
import { VisType } from "@gooddata/sdk-ui";

import {
    useDashboardSelector,
    selectSettings,
    useDashboardScheduledEmails,
    selectDashboardUserAutomations,
    selectAutomationId,
} from "../../../../model/index.js";
import {
    DashboardItem,
    DashboardItemHeadline,
    DashboardItemVisualization,
    getVisTypeCssClass,
} from "../../../presentationComponents/index.js";
import { DashboardInsight } from "../../insight/index.js";
import { useInsightExport } from "../../common/index.js";
import { useDashboardComponentsContext } from "../../../dashboardContexts/index.js";
import { InsightWidgetDescriptionTrigger } from "../../description/InsightWidgetDescriptionTrigger.js";

import { useInsightMenu } from "./useInsightMenu.js";
import { DashboardWidgetInsightGuard } from "./DashboardWidgetInsightGuard.js";
import { IDefaultDashboardInsightWidgetProps } from "./types.js";
import { useAlertingAndScheduling } from "./useAlertingAndScheduling.js";
import { createSelector } from "@reduxjs/toolkit";

const selectIsWidgetHighlighted = (widgetId: string) =>
    createSelector(
        selectAutomationId,
        selectDashboardUserAutomations,
        (automationId, automations) =>
            !!automationId &&
            automations?.some((a) => a.id === automationId && a.metadata?.widget === widgetId),
    );

export const DefaultDashboardInsightWidget: React.FC<Omit<IDefaultDashboardInsightWidgetProps, "insight">> = (
    props,
) => {
    return <DashboardWidgetInsightGuard {...props} Component={DefaultDashboardInsightWidgetCore} />;
};

/**
 * @internal
 */
const DefaultDashboardInsightWidgetCore: React.FC<
    IDefaultDashboardInsightWidgetProps & { insight?: IInsight }
> = ({ widget, insight, screen, onError, onExportReady, onLoadingChanged, dashboardItemClasses }) => {
    const intl = useIntl();
    const settings = useDashboardSelector(selectSettings);

    const {
        isScheduledEmailingVisible,
        isScheduledManagementEmailingVisible,
        onScheduleEmailingOpen,
        onScheduleEmailingManagementOpen,
    } = useDashboardScheduledEmails();

    const visType = insight ? (insightVisualizationType(insight) as VisType) : undefined;
    const { ref: widgetRef } = widget;

    const { exportCSVEnabled, exportXLSXEnabled, onExportCSV, onExportXLSX } = useInsightExport({
        widgetRef,
        title: widgetTitle(widget) || intl.formatMessage({ id: "export.defaultTitle" }),
        insight,
    });

    const onScheduleExport = useCallback(() => {
        onScheduleEmailingOpen(widget);
    }, [onScheduleEmailingOpen, widget]);

    const onScheduleManagementExport = useCallback(() => {
        onScheduleEmailingManagementOpen(widget);
    }, [onScheduleEmailingManagementOpen, widget]);

    const {
        isAlertingVisible,
        alertingDisabled,
        alertingDisabledReason,
        scheduleExportDisabled,
        scheduleExportManagementDisabled,
        scheduleExportDisabledReason,
    } = useAlertingAndScheduling({
        widget,
        insight,
    });

    ///
    const { closeMenu, isMenuOpen, menuItems, openMenu } = useInsightMenu({
        insight,
        widget,
        exportCSVEnabled,
        exportXLSXEnabled,
        onExportCSV,
        onExportXLSX,
        onScheduleExport,
        onScheduleManagementExport,
        isScheduleExportVisible: isScheduledEmailingVisible,
        isScheduleExportManagementVisible: isScheduledManagementEmailingVisible,
        isAlertingVisible,
        alertingDisabled,
        alertingDisabledReason,
        scheduleExportDisabled,
        scheduleExportManagementDisabled,
        scheduleExportDisabledReason,
    });
    const toggleMenu = useCallback(() => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }, [isMenuOpen, closeMenu, openMenu]);

    const {
        InsightMenuButtonComponentProvider,
        InsightMenuComponentProvider,
        ErrorComponent,
        LoadingComponent,
    } = useDashboardComponentsContext();

    const InsightMenuButtonComponent = useMemo(
        () => InsightMenuButtonComponentProvider(insight, widget),
        [InsightMenuButtonComponentProvider, insight, widget],
    );

    const InsightMenuComponent = useMemo(
        () => InsightMenuComponentProvider(insight, widget),
        [InsightMenuComponentProvider, insight, widget],
    );

    const isHighlighted = useDashboardSelector(selectIsWidgetHighlighted(widget.identifier));
    const [ignoreHighlight, setIgnoreHighlight] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        if (isHighlighted) {
            timeout = setTimeout(() => {
                setIgnoreHighlight(true);
            }, 5000);
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [isHighlighted]);

    return (
        <DashboardItem
            className={cx(
                dashboardItemClasses,
                "type-visualization",
                "gd-dashboard-view-widget",
                getVisTypeCssClass(widget.type, visType),
                { "gd-highlighted": isHighlighted && !ignoreHighlight },
            )}
            screen={screen}
        >
            <DashboardItemVisualization
                renderHeadline={(clientHeight) =>
                    !widget.configuration?.hideTitle && (
                        <DashboardItemHeadline title={widget.title} clientHeight={clientHeight} />
                    )
                }
                renderBeforeVisualization={() => (
                    <div className="gd-absolute-row">
                        {settings?.enableDescriptions ? (
                            <InsightWidgetDescriptionTrigger
                                insight={insight}
                                widget={widget}
                                screen={screen}
                            />
                        ) : null}
                        <InsightMenuButtonComponent
                            insight={insight}
                            widget={widget}
                            isOpen={isMenuOpen}
                            onClick={toggleMenu}
                            items={menuItems}
                        />
                    </div>
                )}
                renderAfterContent={() => {
                    if (!isMenuOpen) {
                        return null;
                    }

                    return (
                        <InsightMenuComponent
                            insight={insight}
                            widget={widget}
                            isOpen={isMenuOpen}
                            onClose={closeMenu}
                            items={menuItems}
                        />
                    );
                }}
            >
                {({ clientHeight, clientWidth }) => (
                    <DashboardInsight
                        clientHeight={clientHeight}
                        clientWidth={clientWidth}
                        insight={insight}
                        widget={widget}
                        onExportReady={onExportReady}
                        onLoadingChanged={onLoadingChanged}
                        onError={onError}
                        ErrorComponent={ErrorComponent}
                        LoadingComponent={LoadingComponent}
                    />
                )}
            </DashboardItemVisualization>
        </DashboardItem>
    );
};
