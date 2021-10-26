// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { GranteeItem, IGranteeGroup, IGranteeGroupAll, IGranteeItemProps, IGranteeUser } from "./types";
import { getGranteeLabel } from "./utils";

interface IGranteeUserItemProps {
    grantee: IGranteeUser;
    onDelete: (grantee: GranteeItem) => void;
}

interface IGranteeGroupItemProps {
    grantee: IGranteeGroup | IGranteeGroupAll;
    onDelete: (grantee: GranteeItem) => void;
}

const GranteeUserItem = (props: IGranteeUserItemProps): JSX.Element => {
    const { grantee, onDelete } = props;
    const intl = useIntl();

    const granteeLabel = useMemo(() => {
        const name = getGranteeLabel(grantee, intl);
        const you = intl.formatMessage({ id: "shareDialog.share.grantee.item.you" });

        return grantee.isOwner ? `${name} (${you})` : name;
    }, [grantee, intl]);

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

    const groupName = useMemo(() => getGranteeLabel(grantee, intl), [grantee, intl]);

    const numOfUsers = useMemo(() => {
        return `${grantee.granteeCount} ${intl.formatMessage({
            id: "shareDialog.share.grantee.item.users",
        })}`;
    }, [grantee, intl]);

    return (
        <div className="gd-share-dialog-grantee-item">
            <span className="gd-grantee-item-icon gd-grantee-icon-group gd-grantee-item-icon-left" />
            <div className="gd-grantee-content">
                <div className="gd-grantee-content-label">{groupName}</div>
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
export const GranteeItemComponent = (props: IGranteeItemProps): JSX.Element => {
    const { grantee, onDelete } = props;

    if (grantee.granteeType === "user") {
        return <GranteeUserItem grantee={grantee} onDelete={onDelete} />;
    } else {
        return <GranteeGroupItem grantee={grantee} onDelete={onDelete} />;
    }
};
