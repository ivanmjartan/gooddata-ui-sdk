// (C) 2019-2022 GoodData Corporation
import React from "react";

import { Heatmap } from "@gooddata/sdk-ui-charts";

import * as Md from "./fullStg2";
import { newAttributeAreaSort, newAttributeLocator, newMeasureSort } from "@gooddata/sdk-model";

//const attributeSortAsc = newAttributeSort(Md.ActivityType, "asc");
//const attributeSortDesc = newAttributeSort(Md.ActivityType, "desc");

const measureSort = newMeasureSort(Md.NrOfActivities, "desc", [
    newAttributeLocator(Md.Department, "/gdc/md/lxp9bhn6jda0ynikh1y7tyrfv7dvqlbe/obj/1026/elements?id=1226"),
]);

const attributeSortSum2 = newAttributeAreaSort(Md.ActivityType, "asc");

export const Charts: React.FC = () => {
    return (
        <div style={{ padding: 20 }}>
            {/*  Rows
            <hr />
            Without/default


            <div style={{ height: 250 }}>
                <Heatmap
                    measure={Md.NrOfActivities}
                    rows={Md.ActivityType}
                />
            </div>

             att desc

            <div style={{ height: 250 }}>
                <Heatmap
                    measure={Md.NrOfActivities}
                    rows={Md.ActivityType}
                    sortBy={[attributeSortDesc]}
                />
            </div>

            att asc

            <div style={{ height: 250 }}>
                <Heatmap
                    measure={Md.NrOfActivities}
                    rows={Md.ActivityType}
                    sortBy={[attributeSortAsc]}
                />
            </div>
          */}
            Rows / Columns
            <hr />
            no sort
            <div style={{ height: 250 }}>
                <Heatmap measure={Md.NrOfActivities} rows={Md.ActivityType} columns={Md.Department} />
            </div>
            Sort by measure in Direct sales
            <div style={{ height: 250 }}>
                <Heatmap
                    measure={Md.NrOfActivities}
                    rows={Md.ActivityType}
                    columns={Md.Department}
                    sortBy={[measureSort]}
                />
            </div>
            Area sort
            <div style={{ height: 250 }}>
                <Heatmap
                    measure={Md.NrOfActivities}
                    rows={Md.ActivityType}
                    columns={Md.Department}
                    sortBy={[attributeSortSum2]}
                />
            </div>
        </div>
    );
};
