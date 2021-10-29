// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { areObjRefsEqual, IUser, ObjRef } from "@gooddata/sdk-model";
import { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase";
import { GranteeItem, IGranteeGroupAll, IGranteeUser } from "./ShareDialogBase/types";
import { IShareDialogProps } from "./types";
import { ShareStatus } from "@gooddata/sdk-backend-spi";
import { filterNotInArray, GranteeGroupAll } from "./ShareDialogBase/utils";

const mapUserFullName = (user: IUser): string => {
    if (user.fullName) {
        return user.fullName;
    }

    return `${user.firstName} ${user.lastName}`;
};

const mapOwnerToGrantee = (user: IUser, currentUserRef: ObjRef): IGranteeUser => {
    return {
        granteeType: "user",
        id: user.ref,
        granteeName: mapUserFullName(user),
        granteeEmail: user.email,
        isOwner: true,
        isCurrentUser: areObjRefsEqual(user.ref, currentUserRef),
    };
};

const mapShareStatusToGroupAll = (shareStatus: ShareStatus): IGranteeGroupAll | undefined => {
    if (shareStatus === "public") {
        return GranteeGroupAll;
    }
};

const mapGranteesToShareStatus = (
    grantees: GranteeItem[],
    granteesToAdd: GranteeItem[],
    granteesToDelete: GranteeItem[],
): ShareStatus => {
    const omitDeleted = filterNotInArray(grantees, granteesToDelete);
    const withAdded = [...omitDeleted, ...granteesToAdd];

    if (withAdded.some((g) => areObjRefsEqual(g.id, GranteeGroupAll.id))) {
        return "public";
    }

    return "private";
};

/**
 * @internal
 */
export const ShareDialog = (props: IShareDialogProps): JSX.Element => {
    const { sharedObject, currentUserRef, onApply, onCancel } = props;

    const owner = useMemo(() => {
        return mapOwnerToGrantee(sharedObject.createdBy, currentUserRef);
    }, [sharedObject, currentUserRef]);

    const grantees = useMemo(() => {
        const groupAll = mapShareStatusToGroupAll(sharedObject.shareStatus);
        if (groupAll) {
            return [groupAll];
        }
        return [];
    }, [sharedObject]);

    const onSubmit = useCallback(
        (granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => {
            const status = mapGranteesToShareStatus(grantees, granteesToAdd, granteesToDelete);
            onApply({ shareStatus: status });
        },
        [grantees, onApply],
    );

    return <ShareDialogBase owner={owner} grantees={grantees} onCancel={onCancel} onSubmit={onSubmit} />;
};
