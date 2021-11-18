// (C) 2021 GoodData Corporation
import { areObjRefsEqual, IUser, ObjRef } from "@gooddata/sdk-model";
import {
    GranteeItem,
    IGranteeGroup,
    IGranteeGroupAll,
    IGranteeUser,
    IGranteeUserInactive,
} from "./ShareDialogBase/types";
import { IWorkspaceUser, IWorkspaceUserGroup, ShareStatus } from "@gooddata/sdk-backend-spi";
import { notInArrayFilter, GranteeGroupAll, InactiveOwner } from "./ShareDialogBase/utils";

/**
 * @internal
 */
export const mapWorkspaceUserToGrantee = (user: IWorkspaceUser): IGranteeUser => {
    return {
        type: "user",
        id: user.ref,
        name: mapUserFullName(user),
        email: user.email,
        isOwner: false,
        isCurrentUser: false, //areObjRefsEqual(user.ref, currentUserRef),
    };
};

export const mapWorkspaceUserGroupToGrantee = (userGroup: IWorkspaceUserGroup): IGranteeGroup => {
    return {
        id: userGroup.ref,
        type: "group",
        name: userGroup.name,
    };
};

/**
 * @internal
 */
export const mapUserFullName = (user: IUser | IWorkspaceUser): string => {
    if (user.fullName) {
        return user.fullName;
    }

    return `${user.firstName} ${user.lastName}`;
};

/**
 * @internal
 */
export const mapOwnerToGrantee = (user: IUser, currentUserRef: ObjRef): IGranteeUser => {
    return {
        type: "user",
        id: user.ref,
        name: mapUserFullName(user),
        email: user.email,
        isOwner: true,
        isCurrentUser: areObjRefsEqual(user.ref, currentUserRef),
    };
};

export const mapUserToInactiveGrantee = (): IGranteeUserInactive => {
    return InactiveOwner;
};

/**
 * @internal
 */
export const mapShareStatusToGroupAll = (shareStatus: ShareStatus): IGranteeGroupAll | undefined => {
    if (shareStatus === "public") {
        return GranteeGroupAll;
    }
};

/**
 * @internal
 */
export const mapGranteesToShareStatus = (
    grantees: GranteeItem[],
    granteesToAdd: GranteeItem[],
    granteesToDelete: GranteeItem[],
): ShareStatus => {
    const omitDeleted = notInArrayFilter(grantees, granteesToDelete);
    const withAdded = [...omitDeleted, ...granteesToAdd];

    if (withAdded.some((g) => areObjRefsEqual(g.id, GranteeGroupAll.id))) {
        return "public";
    }

    // check na delku >0 return shared

    return "private";
};
