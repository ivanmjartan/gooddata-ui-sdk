// (C) 2021 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button } from "../../Button/Button";
import { ConfirmDialogBase } from "../ConfirmDialogBase";
import { AddGranteeContent } from "./AddGranteeContent";
import { IAddGranteeBaseProps } from "./types";

interface IBackButtonProps {
    onBackClick: () => void;
}

const BackButton = (props: IBackButtonProps) => {
    const { onBackClick } = props;

    return (
        <Button
            value={""}
            className={
                "gd-button-primary gd-button-icon-only gd-icon-navigateleft gd-share-dialog-header-back-button"
            }
            onClick={onBackClick}
        />
    );
};

/**
 * @internal
 */
export const AddGranteeBase = (props: IAddGranteeBaseProps): JSX.Element => {
    const { onCancel, onSubmit, onBackClick, onAddUserOrGroups } = props;
    const intl = useIntl();

    const backButtonRenderer = useCallback(() => {
        return <BackButton onBackClick={onBackClick} />;
    }, [onBackClick]);

    return (
        <ConfirmDialogBase // extract to separate component
            className="gd-share-dialog"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={false}
            headline={intl.formatMessage({ id: "shareDialog.share.grantee.add.info" })}
            cancelButtonText={intl.formatMessage({ id: "cancel" })}
            submitButtonText={intl.formatMessage({ id: "shareDialog.share.grantee.share" })}
            onCancel={onBackClick}
            onSubmit={onSubmit}
            onClose={onCancel}
            headerLeftButtonRenderer={backButtonRenderer}
        >
            <AddGranteeContent onAddUserOrGroups={onAddUserOrGroups} />
        </ConfirmDialogBase>
    );
};
