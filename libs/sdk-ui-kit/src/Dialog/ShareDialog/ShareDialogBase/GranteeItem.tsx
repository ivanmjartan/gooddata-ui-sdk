// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";

import {
    DialogModeType,
    GranteeItem,
    IGranteeGroup,
    IGranteeGroupAll,
    IGranteeItemProps,
    IGranteeUser,
} from "./types";
import { getGranteeLabel } from "./utils";
import { GranteeGroupIcon, GranteeOwnerRemoveIcon, GranteeRemoveIcon, GranteeUserIcon } from "./GranteeIcons";

interface IGranteeUserItemProps {
    grantee: IGranteeUser;
    mode: DialogModeType;
    onDelete: (grantee: GranteeItem) => void;
}

interface IGranteeGroupItemProps {
    grantee: IGranteeGroup | IGranteeGroupAll;
    mode: DialogModeType;
    onDelete: (grantee: GranteeItem) => void;
}

const GranteeUserItem = (props: IGranteeUserItemProps): JSX.Element => {
    const { grantee, mode, onDelete } = props;
    const intl = useIntl();

    const granteeLabel = useMemo(() => {
        const name = getGranteeLabel(grantee, intl);
        const you = intl.formatMessage({ id: "shareDialog.share.grantee.item.you" });
        return grantee.isCurrentUser ? `${name} (${you})` : name;
    }, [grantee, intl]);

    const onClick = useCallback(() => {
        onDelete(grantee);
    }, [grantee, onDelete]);

    return (
        <div className="gd-share-dialog-grantee-item">
            {grantee.isOwner ? (
                <GranteeOwnerRemoveIcon />
            ) : (
                <GranteeRemoveIcon mode={mode} onClick={onClick} />
            )}
            <div className="gd-grantee-content">
                <div className="gd-grantee-content-label">{granteeLabel}</div>
                <div className="gd-grantee-content-label gd-grantee-content-email">
                    {grantee.granteeEmail}
                </div>
            </div>
            <GranteeUserIcon />
        </div>
    );
};

const GranteeGroupItem = (props: IGranteeGroupItemProps): JSX.Element => {
    const { grantee, onDelete, mode } = props;

    const intl = useIntl();

    const onClick = useCallback(() => {
        onDelete(grantee);
    }, [grantee, onDelete]);

    const groupName = useMemo(() => getGranteeLabel(grantee, intl), [grantee, intl]);

    const numOfUsers = useMemo(() => {
        if (grantee.granteeCount) {
            return `${grantee.granteeCount} ${intl.formatMessage({
                id: "shareDialog.share.grantee.item.users",
            })}`;
        }
    }, [grantee, intl]);

    return (
        <div className="gd-share-dialog-grantee-item">
            <GranteeRemoveIcon mode={mode} onClick={onClick} />
            <div className="gd-grantee-content">
                <div className="gd-grantee-content-label">{groupName}</div>
                {numOfUsers && (
                    <div className="gd-grantee-content-label gd-grantee-content-user-count">{numOfUsers}</div>
                )}
            </div>
            <GranteeGroupIcon />
        </div>
    );
};

/**
 * @internal
 */
export const GranteeItemComponent = (props: IGranteeItemProps): JSX.Element => {
    const { grantee, mode, onDelete } = props;

    if (grantee.granteeType === "user") {
        return <GranteeUserItem grantee={grantee} mode={mode} onDelete={onDelete} />;
    } else {
        return <GranteeGroupItem grantee={grantee} mode={mode} onDelete={onDelete} />;
    }
};
