// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase";
import { GranteeItem } from "./ShareDialogBase/types";
import { IShareDialogProps } from "./types";
import invariant from "ts-invariant";
import { mapGranteesToShareStatus, mapOwnerToGrantee, mapShareStatusToGroupAll } from "./shareDialogMappers";

/**
 * @internal
 */
export const ShareDialog = (props: IShareDialogProps): JSX.Element => {
    const { sharedObject, currentUserRef, onApply, onCancel } = props;

    const owner = useMemo(() => {
        invariant(sharedObject.createdBy, "ShareDialog sharedObject.createdBy should be specified.");

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
