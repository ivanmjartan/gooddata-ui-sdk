// (C) 2007-2021 GoodData Corporation
import React, { Component, useState } from "react";
import { StaticLegend } from "../StaticLegend";
import { IPushpinCategoryLegendItem } from "../types";

import { LegendDialog } from "./LegendDialog";

export interface IPopUpLegendProps {
    series: IPushpinCategoryLegendItem[];
}

/*export interface IStaticLegendProps {
    containerHeight: number;
    position: string;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean | ItemBorderRadiusPredicate;
    shouldFillAvailableSpace?: boolean;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
}*/

export const PopUpLegend: React.FC<IPopUpLegendProps> = (props: IPopUpLegendProps) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const onCloseDialog = () => setDialogOpen(false);

    return <><div style={{display:"flex",flexDirection:"row-reverse",  height:100}}>
        <div onClick={()=>{ setDialogOpen(true)}} className={"s-legend-anchor"}>legend click me! </div>
        <LegendDialog
            isOpen = {isDialogOpen}
            onCloseDialog = {onCloseDialog}
        >
            <div style={{height:300, width:300, border:"1px solid",borderColor:"#F5F5F5"}}>
               <StaticLegend
                    containerHeight={300}
                    series={props.series}
                    position={"left"}
                />
            </div>
        </LegendDialog>
    </div>
    </>
};