// (C) 2021 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { ConfirmDialogBase } from "../ConfirmDialogBase";
import { ShareGranteeContent } from "./ShareGranteeContent";

/**
 * @internal
 */
export interface IShareGranteeBaseProps {
    onAddGrantee?: () => void;
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
export const ShareGranteeBase = (props: IShareGranteeBaseProps): JSX.Element => {
    const { onCancel, onSubmit, onAddGrantee } = props;
    const intl = useIntl();

    return (
        <ConfirmDialogBase
            className="gd-share-dialog"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={false}
            headline={intl.formatMessage({ id: "Share with users and groups" })}
            cancelButtonText={intl.formatMessage({ id: "Cancel" })}
            submitButtonText={intl.formatMessage({ id: "Save" })}
            onCancel={onCancel}
            onSubmit={onSubmit}
        >
            <ShareGranteeContent onAddGrantee={onAddGrantee} />
        </ConfirmDialogBase>
    );
};
