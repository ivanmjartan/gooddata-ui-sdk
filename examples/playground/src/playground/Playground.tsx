// (C) 2024-2025 GoodData Corporation

import * as React from "react";
import { InsightView } from "@gooddata/sdk-ui-ext";

const insight = "ee4f3f21-af9e-448e-bb21-a6b0b83eb503";
const showTitle = "infintive grid";
const style = { height: 400 };

export const Playground: React.FC = () => {
    return (
        <div style={style}>
            <InsightView insight={insight} showTitle={showTitle} />
        </div>
    );
};

/*
 const rowNode = gridApi.getDisplayedRowAtIndex(rowIndex);
    if (!rowNode) {
        return null;
    }

    const cell = rowNode.allLeafChildren?.find((col: any) => col.column.colId === attributeId);
    return cell?.eGui ?? null;
*/
