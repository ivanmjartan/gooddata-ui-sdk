// (C) 2020-2021 GoodData Corporation

import { isDrillToLegacyDashboard } from "@gooddata/sdk-backend-spi";
import { IDrillEvent, isDrillIntersectionAttributeItem } from "@gooddata/sdk-ui";
import compact from "lodash/compact";
import { getDrillOriginLocalIdentifier } from "../../../_staging/drills/drillingUtils";
import { DashboardDrillDefinition, isDrillDownDefinition } from "../../../types";

import { isDrillToUrl } from "../types";

/**
 * @internal
 */
export function getDrillDownAttributeTitle(localIdentifier: string, drillEvent: IDrillEvent): string {
    return (drillEvent.drillContext.intersection || [])
        .map((intersectionElement) => intersectionElement.header)
        .filter(isDrillIntersectionAttributeItem)
        .filter(
            (intersectionAttributeItem) =>
                intersectionAttributeItem.attributeHeader.localIdentifier === localIdentifier,
        )
        .map((intersectionAttributeItem) => intersectionAttributeItem.attributeHeaderItem.name)[0];
}

/**
 * Get total number of IDrillToUrl
 * @internal
 */
export function getTotalDrillToUrlCount(drillDefinition: DashboardDrillDefinition[]): number {
    return drillDefinition.filter(isDrillToUrl).length;
}

/**
 * Implicit drillDown has lower priority, so needs to be removed when other drill config exists for the same attribute
 *
 * @internal
 */
export function filterDrillFromAttributeByPriority(
    drillDefinitions: DashboardDrillDefinition[],
): DashboardDrillDefinition[] {
    //here we have problem I not able recognize that drillFromUrl could be implicitly generated (this should has lower priority)
    //Maybe introduce priority paramter into IDrillFromAttribute as origin
    //I could add new type as I already tyred (Type defined but not used) but this is not good approach (type will be almost same)
    const drillOriginsWithoutDrillDown = compact(
        drillDefinitions.map((d) => {
            if (!isDrillToLegacyDashboard(d) && !isDrillDownDefinition(d)) {
                return getDrillOriginLocalIdentifier(d);
            }
        }),
    );

    return drillDefinitions.filter((dd) => {
        if (isDrillDownDefinition(dd)) {
            return !drillOriginsWithoutDrillDown.includes(getDrillOriginLocalIdentifier(dd));
        }

        return true;
    });
}
