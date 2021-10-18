// (C) 2021 GoodData Corporation
import React from "react";
import { Overlay } from "../../Overlay";
import { IAlignPoint } from "../../typings/positioning";
import { IShareDialogBaseProps } from "../typings";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

/**
 * @internal
 */
export const ShareDialog = (props: IShareDialogBaseProps): JSX.Element => {
    const { containerClassName } = props;
    return (
        <Overlay
            alignPoints={alignPoints}
            isModal
            positionType="fixed"
            containerClassName={containerClassName}
        >
            {/* <ExportDialogBase
                displayCloseButton={displayCloseButton}
                isPositive={isPositive}
                isSubmitDisabled={isSubmitDisabled}
                headline={headline}
                cancelButtonText={cancelButtonText}
                submitButtonText={submitButtonText}
                filterContextText={filterContextText}
                filterContextTitle={filterContextTitle}
                filterContextVisible={filterContextVisible}
                includeFilterContext={includeFilterContext}
                mergeHeaders={mergeHeaders}
                mergeHeadersDisabled={mergeHeadersDisabled}
                mergeHeadersText={mergeHeadersText}
                mergeHeadersTitle={mergeHeadersTitle}
                onCancel={onCancel}
                onSubmit={onSubmit}
            /> */}
            content
        </Overlay>
    );
};
