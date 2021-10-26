// (C) 2021 GoodData Corporation
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { ConfirmDialogBase } from "../ConfirmDialogBase";
import { ShareGranteeContent } from "./ShareGranteeContent";
import { IShareGranteeBaseProps } from "./types";
import { sortGranteesByName } from "./utils";

/**
 * @internal
 */
export const ShareGranteeBase = (props: IShareGranteeBaseProps): JSX.Element => {
    const { grantees, owner, isDirty, onCancel, onSubmit, onGranteeDelete, onAddGranteeButtonClick } = props;
    const intl = useIntl();

    const granteeList = useMemo(() => {
        const granteeSorterByName = sortGranteesByName(intl);
        return [owner, ...grantees].sort(granteeSorterByName);
    }, [grantees, owner, intl]);

    return (
        <ConfirmDialogBase
            className="gd-share-dialog"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={!isDirty}
            headline={intl.formatMessage({ id: "shareDialog.share.grantee.title" })}
            cancelButtonText={intl.formatMessage({ id: "cancel" })}
            submitButtonText={intl.formatMessage({ id: "save" })}
            onCancel={onCancel}
            onSubmit={onSubmit}
        >
            <ShareGranteeContent
                grantees={granteeList}
                onAddGrantee={onAddGranteeButtonClick}
                onDelete={onGranteeDelete}
            />
        </ConfirmDialogBase>
    );
};
