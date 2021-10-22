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
    const { onCancel, onSubmit, onAddGrantee, grantees, owner } = props;
    const intl = useIntl();

    const granteeList = useMemo(() => {
        return [owner, ...grantees].sort(sortGranteesByName);
    }, [grantees, owner]);

    return (
        <ConfirmDialogBase
            className="gd-share-dialog"
            displayCloseButton={true}
            isPositive={true}
            isSubmitDisabled={false}
            headline={intl.formatMessage({ id: "shareDialog.share.grantee.title" })}
            cancelButtonText={intl.formatMessage({ id: "cancel" })}
            submitButtonText={intl.formatMessage({ id: "save" })}
            onCancel={onCancel}
            onSubmit={onSubmit}
        >
            <ShareGranteeContent
                grantees={granteeList}
                onAddGrantee={onAddGrantee}
                onDelete={(grantee) => {
                    // eslint-disable-next-line no-console
                    console.log("Delete", grantee);
                }}
            />
        </ConfirmDialogBase>
    );
};
