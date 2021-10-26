// (C) 2021 GoodData Corporation

import { GranteeItem, IGranteeGroup, IGranteeGroupAll, IGranteeUser } from "@gooddata/sdk-ui-kit/src/Dialog/";

export const user: IGranteeUser = {
    granteeType: "user",
    id: "userID1",
    granteeName: "User Name",
    granteeEmail: "user.name@gooddata.com",
    isOwner: false,
    isCurrentUser: false,
};

export const owner: IGranteeUser = {
    granteeType: "user",
    id: "userID2",
    granteeName: "Owner Name",
    granteeEmail: "owner.name@gooddata.com",
    isOwner: true,
    isCurrentUser: false,
};

export const current: IGranteeUser = {
    granteeType: "user",
    id: "userID3",
    granteeName: "Current Name",
    granteeEmail: "current.name@gooddata.com",
    isOwner: false,
    isCurrentUser: true,
};

export const currentAndOwen: IGranteeUser = {
    granteeType: "user",
    id: "userID4",
    granteeName: "Owner Current Name",
    granteeEmail: "owner.current.name@gooddata.com",
    isOwner: true,
    isCurrentUser: true,
};

export const group: IGranteeGroup = {
    granteeType: "group",
    id: "groupId",
    granteeCount: 11,
    groupName: "TNT team",
};

export const groupAll: IGranteeGroupAll = {
    granteeType: "groupAll",
    id: "groupAll",
    granteeCount: 11,
};

export const grantees: GranteeItem[] = [user, group];
