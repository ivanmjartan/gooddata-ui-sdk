// (C) 2021 GoodData Corporation

import { GranteeType, IGranteeGroup, IGranteeUser } from "@gooddata/sdk-ui-kit/src/Dialog/";

export const user: IGranteeUser = {
    granteeType: "user",
    id: "userID1",
    granteeName: "User Name",
    granteeEmail: "user.name@gooddata.com",
    isOwner: false,
};

export const owner: IGranteeUser = {
    granteeType: "user",
    id: "ownerID1",
    granteeName: "Owner Name",
    granteeEmail: "owner.name@gooddata.com",
    isOwner: true,
};

export const group: IGranteeGroup = {
    granteeType: "group",
    id: "groupId",
    granteeCount: 11,
    groupName: "TNT team",
};

export const grantees: GranteeType[] = [user, group];
