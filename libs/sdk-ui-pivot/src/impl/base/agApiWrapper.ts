// (C) 2007-2025 GoodData Corporation
import { CellClassFunc, CellClassRules, GridApi, RowClassParams, RowClassRules } from "ag-grid-community";
import { getScrollbarWidth } from "../utils.js";

function getHeaderHeight(gridApi: GridApi): number {
    const heights = gridApi.getSizesForCurrentTheme();
    return heights.headerHeight ?? 0;
}

function getCellElement(gridApi: GridApi, attributeId: string, rowIndex: number): HTMLElement | null {
    // Get the row node for the given index
    const rowNode = gridApi.getDisplayedRowAtIndex(rowIndex);
    if (!rowNode) {
        return null;
    }

    gridApi.setFocusedCell(rowIndex, attributeId);
    const cell = gridApi.getFocusedCell();

    if (cell) {
        //console.log(cell.column.getColDef().cellClass  );
        const val = cell.column.getColDef().cellClass as CellClassFunc<any, any>;

        cell.column.getColDef().cellClass = (params) => {
            return "test-kokot " + val(params);
        };

        // cell.column.getColDef().cellStyle = {backgroundColor: 'red'};
    }

    return null;
}

// Define your row class rules

const cellClassRules: CellClassRules = {
    "gd-cell-show-hidden": (params) => {
        // Apply the class to the pinned top row
        return params.rowIndex === 5 && params.column.getId() === "r_1";
    },
};

function addCellClass(gridApi: GridApi, attributeId: string, rowIndex: number, className: string): void {
    console.log("addCellClass!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("addCellClass", className, attributeId, rowIndex);

    gridApi.updateGridOptions({ defaultColDef: { cellClassRules: cellClassRules } });

    /*   // Get the row node for the given index
     const rowNode = gridApi.getDisplayedRowAtIndex(rowIndex);
     if (!rowNode) {
       return;
     }

    const cellClassRules: CellClassRules = {
        'gd-cell-show-hidden': (params) => {
            // Apply the class to the pinned top row
            return params.rowIndex === rowIndex && params.column.getId() === attributeId;
        },
    };


     gridApi.setFocusedCell(rowIndex, attributeId);
     const cell  = gridApi.getFocusedCell();

     if(cell) {
         //console.log(cell.column.getColDef().cellClass  );
        // const val = cell.column.getColDef().cellClass as CellClassFunc<any, any>;

         cell.column.getColDef().cellClassRules = cellClassRules

        //cell.column.getColDef().cellStyle = {backgroundColor: 'red'};
     }*/
}

function removeCellClass(gridApi: GridApi, attributeId: string, rowIndex: number, className: string): void {
    const cellElement = getCellElement(gridApi, attributeId, rowIndex);
    if (cellElement !== null) {
        cellElement.classList.remove(className);
    }
}

function getPinnedTopRowElement(gridApi: GridApi): HTMLElement | null {
    const pinnedTopRow = gridApi.getPinnedTopRow(0);
    if (!pinnedTopRow) {
        return null;
    }

    // console.log("rowClassRules",pinnedTopRow.id);
    //need to get grid root and find the row element by row-id
    //that was previous impl and must be unstable  because when virtual dom is invalidate than changes are lost
    const rowElement = document?.querySelector(`[row-id=${pinnedTopRow.id}]`);

    //not sure about parentElement.parentElement, need to check it
    return rowElement?.parentElement?.parentElement ?? null;
}

// Define your row class rules
const rowClassRules: RowClassRules = {
    "gd-visible-sticky-row": (params) => {
        // Apply the class to the pinned top row
        return params.node.rowPinned === "top";
    },
};

/*export function updateStickyRowPosition(gridApi: GridApi | null, apiWrapper: any = ApiWrapper): void {
    if (!gridApi) {
        return;
    }

    const headerHeight = apiWrapper.getHeaderHeight(gridApi);
    apiWrapper.setPinnedTopRowStyles(gridApi, {
        top: `${headerHeight}px`,
        "padding-right": `${getScrollbarWidth()}px`,
    });
}*/

function addPinnedTopRowClass(gridApi: GridApi, className: string): void {
    const rowStyle = (param: RowClassParams<any>) => {
        if (param.node.rowPinned === "top") {
            return {
                top: `${getHeaderHeight(gridApi) + 32 + 32}px`,
                position: "fixed",
                paddingRight: `${getScrollbarWidth()}px`,
            };
        }
    };

    console.log("addPinnedTopRowClass", className);

    gridApi.updateGridOptions({ rowClassRules: rowClassRules });
    gridApi.updateGridOptions({ getRowStyle: rowStyle });
    gridApi.refreshHeader();

    //  const rowElement = getPinnedTopRowElement(gridApi);
    /* if (rowElement) {
        rowElement.classList.add(className);
    }*/
}

function removePinnedTopRowClass(gridApi: GridApi, className: string): void {
    /* const rowElement = getPinnedTopRowElement(gridApi);
    if (rowElement) {
        rowElement.classList.remove(className);
    }*/
}

function setPinnedTopRowStyles(gridApi: GridApi, styles: Record<string, string>): void {
    /*const rowElement = getPinnedTopRowElement(gridApi);
    if (rowElement) {
        for (const [key, value] of Object.entries(styles)) {
            (rowElement.style as unknown as Record<string, string>)[key] = value;
        }
    }*/
}

export default {
    getHeaderHeight,
    // cell element
    getCellElement,
    addCellClass,
    removeCellClass,
    // pinned row element
    getPinnedTopRowElement,
    addPinnedTopRowClass,
    removePinnedTopRowClass,
    setPinnedTopRowStyles,
    // pinned row cell element
};
