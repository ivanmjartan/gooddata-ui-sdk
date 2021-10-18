// (C) 2021 GoodData Corporation
import React from "react";
import { Overlay } from "../../Overlay";
import { IAlignPoint } from "../../typings/positioning";
import { ShareDialogBase } from "./ShareDialogBase";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

/**
 * @internal
 */
export interface IShareDialogProps {
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
export const ShareDialog = (props: IShareDialogProps): JSX.Element => {
    const { onCancel, onSubmit } = props;

    return (
        <Overlay
            alignPoints={alignPoints}
            isModal
            positionType="fixed"
            //containerClassName={containerClassName}
        >
            <ShareDialogBase onCancel={onCancel} onSubmit={onSubmit} />
        </Overlay>
    );
};
