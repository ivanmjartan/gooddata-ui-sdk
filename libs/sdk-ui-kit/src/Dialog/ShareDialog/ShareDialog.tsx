// (C) 2021 GoodData Corporation
import React, { useCallback } from "react";
import { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase";
import { GranteeItem, IGranteeGroup, IGranteeUser } from "./ShareDialogBase/types";
import { IShareDialogProps } from "./types";

export const owner: IGranteeUser = {
    granteeType: "user",
    id: "userID2",
    granteeName: "Owner Name",
    granteeEmail: "owner.name@gooddata.com",
    isOwner: true,
    isCurrentUser: false,
};

export const user: IGranteeUser = {
    granteeType: "user",
    id: "userID1",
    granteeName: "User Name",
    granteeEmail: "user.name@gooddata.com",
    isOwner: false,
    isCurrentUser: false,
};

export const group: IGranteeGroup = {
    granteeType: "group",
    id: "groupId",
    granteeCount: 11,
    groupName: "TNT team",
};

export const grantees: GranteeItem[] = [user, group];

/**
 * @public
 */
export const ShareDialog = (_props: IShareDialogProps): JSX.Element => {
    const onCancel = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("onCancel");
    }, []);

    const onSubmit = useCallback((granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => {
        // eslint-disable-next-line no-console
        console.log("granteesToAdd", granteesToAdd, "granteesToDelete", granteesToDelete);
    }, []);

    return <ShareDialogBase owner={owner} grantees={grantees} onCancel={onCancel} onSubmit={onSubmit} />;
};
