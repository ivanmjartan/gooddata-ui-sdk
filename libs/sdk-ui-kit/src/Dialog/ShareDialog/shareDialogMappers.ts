// (C) 2021 GoodData Corporation
import { areObjRefsEqual, IUser, ObjRef } from "@gooddata/sdk-model";
import {
    GranteeItem,
    IGranteeGroup,
    IGranteeGroupAll,
    IGranteeUser,
    IGranteeUserInactive,
    isGranteeGroupAll,
    isGranteeUserInactive,
} from "./ShareDialogBase/types";
import { IAccessGrantee, IWorkspaceUser, IWorkspaceUserGroup, ShareStatus } from "@gooddata/sdk-backend-spi";
import { notInArrayFilter, GranteeGroupAll, InactiveOwner } from "./ShareDialogBase/utils";
import { typesUtils } from "@gooddata/util";

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

/**
 * @internal
 */
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

/**
 * @internal
 */
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
export const mapGranteesToAccessGrantees = (grantees: GranteeItem[]): IAccessGrantee[] => {
    const guard = typesUtils.combineGuards(isGranteeGroupAll, isGranteeUserInactive);
    return grantees
        .filter((g) => !guard(g))
        .map((g) => {
            return {
                granteeRef: g.id,
            };
        });
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

    if (withAdded.length > 0) {
        return "shared";
    }

    return "private";
};
