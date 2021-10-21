// (C) 2021 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";
import { Button } from "../../Button/Button";
import { ConfirmDialogBase } from "../ConfirmDialogBase";
import { AddGranteeContent } from "./AddGranteeContent";

/**
 * @internal
 */
export interface IAddGranteeBaseProps {
    onBackClick?: () => void;
    onAddUserOrGroups?: () => void;
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
export const AddGranteeBase = (props: IAddGranteeBaseProps): JSX.Element => {
    const { onCancel, onSubmit, onBackClick, onAddUserOrGroups } = props;
    const intl = useIntl();

    const backButtonRenderer = () => {
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

    return (
        <ConfirmDialogBase // extract to separate component
            className="gd-share-dialog"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={false}
            headline={intl.formatMessage({ id: "shareDialog.share.grantee.add.info" })}
            cancelButtonText={intl.formatMessage({ id: "cancel" })}
            submitButtonText={intl.formatMessage({ id: "save" })}
            onCancel={onCancel}
            onSubmit={onSubmit}
            headerLeftButtonRenderer={backButtonRenderer}
        >
            <AddGranteeContent onAddUserOrGroups={onAddUserOrGroups} />
        </ConfirmDialogBase>
    );
};

/*

<div class="gd-dialog-header" style="
    display: flex;
"><button title="" class="gd-button-primary gd-button-icon-only gd-icon-add  gd-button" type="button" tabindex="-1" style="
    min-width: 31px;
    flex: 0 0 31px;
    margin-right: 10px;
"></button><h3>Share with users and groupsShare with users and groupsShare with users and groupsShare with users and groupsShare with users and groups</h3></div>
*/
