// (C) 2021 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { Button } from "../../../Button";
import { ConfirmDialogBase } from "../../ConfirmDialogBase";
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
    const {
        availableGrantees,
        addedGrantees,
        isDirty,
        onCancel,
        onSubmit,
        onBackClick,
        onAddUserOrGroups,
        onDelete,
    } = props;
    const intl = useIntl();

    const backButtonRenderer = useCallback(() => {
        return <BackButton onBackClick={onBackClick} />;
    }, [onBackClick]);

    return (
        <ConfirmDialogBase
            className="gd-share-dialog gd-share-dialog-add-users"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={!isDirty}
            headline={intl.formatMessage({ id: "shareDialog.share.grantee.add.info" })}
            cancelButtonText={intl.formatMessage({ id: "cancel" })}
            submitButtonText={intl.formatMessage({ id: "shareDialog.share.grantee.share" })}
            onCancel={onBackClick}
            onSubmit={onSubmit}
            onClose={onCancel}
            headerLeftButtonRenderer={backButtonRenderer}
        >
            <AddGranteeContent
                addedGrantees={addedGrantees}
                availableGrantees={availableGrantees}
                onAddUserOrGroups={onAddUserOrGroups}
                onDelete={onDelete}
            />
        </ConfirmDialogBase>
    );
};
