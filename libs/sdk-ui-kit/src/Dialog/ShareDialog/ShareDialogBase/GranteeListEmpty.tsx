// (C) 2021 GoodData Corporation
import React from "react";
import { useIntl } from "react-intl";

/**
 * @internal
 */
export const GranteeListEmpty = (): JSX.Element => {
    const intl = useIntl();

    return (
        <div className="gd-share-dialog-grantee-list-empty-selection">
            <span> {intl.formatMessage({ id: "shareDialog.share.grantee.add.empty.selection" })} </span>
        </div>
    );
};
