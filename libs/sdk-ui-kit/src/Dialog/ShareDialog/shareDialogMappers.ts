// (C) 2021 GoodData Corporation
import { areObjRefsEqual, IUser, ObjRef } from "@gooddata/sdk-model";
import { GranteeItem, IGranteeGroupAll, IGranteeUser } from "./ShareDialogBase/types";
import { ShareStatus } from "@gooddata/sdk-backend-spi";
import { notInArrayFilter, GranteeGroupAll } from "./ShareDialogBase/utils";

/**
 * @internal
 */
export const mapUserFullName = (user: IUser): string => {
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
        granteeType: "user",
        id: user.ref,
        granteeName: mapUserFullName(user),
        granteeEmail: user.email,
        isOwner: true,
        isCurrentUser: areObjRefsEqual(user.ref, currentUserRef),
    };
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

    return "private";
};
