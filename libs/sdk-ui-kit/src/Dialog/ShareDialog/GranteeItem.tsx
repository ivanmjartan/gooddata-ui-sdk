// (C) 2021 GoodData Corporation
import React, { useCallback } from "react";
import { useIntl } from "react-intl";
import { GranteeType, IGranteeGroup, IGranteeItemProps, IGranteeUser } from "./types";

interface IGranteeUserItemProps {
    grantee: IGranteeUser;
    onDelete: (igrantee: GranteeType) => void;
}

interface IGranteeGroupItemProps {
    grantee: IGranteeGroup;
    onDelete: (grantee: GranteeType) => void;
}

const GranteeUserItem = (props: IGranteeUserItemProps): JSX.Element => {
    const { grantee, onDelete } = props;
    const intl = useIntl();

    const granteeLabel = grantee.isOwner
        ? `${grantee.granteeName} (${intl.formatMessage({ id: "shareDialog.share.grantee.item.you" })})`
        : grantee.granteeName;

    const onClick = useCallback(() => {
        onDelete(grantee);
    }, [grantee, onDelete]);

    return (
        <div className="gd-share-dialog-grantee-item">
            <span className="gd-grantee-item-icon gd-grantee-icon-user gd-grantee-item-icon-left" />
            <div className="gd-grantee-content">
                <div className="gd-grantee-content-label">{granteeLabel}</div>
                <div className="gd-grantee-content-label gd-grantee-content-email">
                    {grantee.granteeEmail}
                </div>
            </div>
            {!grantee.isOwner && (
                <span
                    className="gd-grantee-item-icon gd-grantee-icon-trash gd-grantee-item-icon-right"
                    onClick={onClick}
                />
            )}
        </div>
    );
};

const GranteeGroupItem = (props: IGranteeGroupItemProps): JSX.Element => {
    const { grantee, onDelete } = props;

    const intl = useIntl();

    const onClick = useCallback(() => {
        onDelete(grantee);
    }, [grantee, onDelete]);

    const numOfUsers = `${grantee.granteeCount} ${intl.formatMessage({
        id: "shareDialog.share.grantee.item.users",
    })}`;

    return (
        <div className="gd-share-dialog-grantee-item">
            <span className="gd-grantee-item-icon gd-grantee-icon-group gd-grantee-item-icon-left" />
            <div className="gd-grantee-content">
                <div className="gd-grantee-content-label">{grantee.groupName}</div>
                <div className="gd-grantee-content-label gd-grantee-content-user-count">{numOfUsers}</div>
            </div>
            <span
                className="gd-grantee-item-icon gd-grantee-icon-trash gd-grantee-item-icon-right"
                onClick={onClick}
            />
        </div>
    );
};

/**
 * @internal
 */
export const GranteeItem = (props: IGranteeItemProps): JSX.Element => {
    const { grantee, onDelete } = props;

    if (grantee.granteeType === "user") {
        return <GranteeUserItem grantee={grantee} onDelete={onDelete} />;
    } else {
        return <GranteeGroupItem grantee={grantee} onDelete={onDelete} />;
    }
};
