// (C) 2019-2024 GoodData Corporation
import React from "react";
import { Typography } from "@gooddata/sdk-ui-kit";
import isEmpty from "lodash/isEmpty.js";

import { IDashboardLayoutSectionFacade } from "../../../_staging/dashboard/flexibleLayout/index.js";
import { useLayoutSectionsConfiguration } from "../../widget/common/useLayoutSectionsConfiguration.js";

import { DashboardLayoutSectionHeaderDescription } from "./DashboardLayoutSectionHeaderDescription.js";

export interface IDashboardLayoutSectionHeaderProps {
    section: IDashboardLayoutSectionFacade<unknown>;
}

export const DashboardLayoutViewSectionHeader: React.FC<IDashboardLayoutSectionHeaderProps> = ({
    section,
}) => {
    const { areSectionHeadersEnabled } = useLayoutSectionsConfiguration(section.layout().raw());
    const title = section.title();
    const description = section.description();
    if (!areSectionHeadersEnabled || (isEmpty(title) && isEmpty(description))) {
        return null;
    }
    const isNestedLayout = section.layout().parent() !== undefined;
    return (
        <div className="gd-fluid-layout-row-header s-fluid-layout-row-header">
            <div className={"gd-fluid-layout-row-header-container"}>
                <div className="gd-row-header-view">
                    {title ? (
                        <div className="gd-row-header-title-wrapper">
                            <span className="title">
                                <Typography
                                    tagName={isNestedLayout ? "h3" : "h2"}
                                    className="s-fluid-layout-row-title"
                                >
                                    {title}
                                </Typography>
                            </span>
                        </div>
                    ) : null}
                    {description ? (
                        <DashboardLayoutSectionHeaderDescription description={description} />
                    ) : null}
                </div>
            </div>
        </div>
    );
};
