// (C) 2021 GoodData Corporation
import React from "react";
import { ConfirmDialogBase } from "../ConfirmDialogBase";

/**
 * @internal
 */
export interface IShareDialogBaseProps {
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
export const ShareDialogBase = (props: IShareDialogBaseProps): JSX.Element => {
    const { onCancel, onSubmit } = props;

    return (
        <ConfirmDialogBase
            className="gd-share-dialog"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={false}
            headline={"Share with users and groups"}
            cancelButtonText={"Cancel"}
            submitButtonText={"Save"}
            onCancel={onCancel}
            onSubmit={onSubmit}
        >
            content
        </ConfirmDialogBase>
    );
};
