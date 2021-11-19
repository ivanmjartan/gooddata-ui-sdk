// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase";
import { GranteeItem } from "./ShareDialogBase/types";
import { IShareDialogProps } from "./types";
import {
    mapGranteesToAccessGrantees,
    mapGranteesToShareStatus,
    mapOwnerToGrantee,
    mapShareStatusToGroupAll,
    mapUserToInactiveGrantee,
} from "./shareDialogMappers";
import {
    BackendProvider,
    IntlWrapper,
    useBackendStrict,
    useWorkspaceStrict,
    WorkspaceProvider,
} from "@gooddata/sdk-ui";
import { useGetAccessList } from "./ShareDialogBase/useGetAccessList";

/**
 * @internal
 */
export const ShareDialog: React.FC<IShareDialogProps> = (props) => {
    const { backend, workspace, locale, sharedObject, currentUserRef, onApply, onCancel } = props;
    const { createdBy, shareStatus, ref: sharedObjectRef } = sharedObject;

    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);

    const [grantees, setGrantees] = useState<GranteeItem[]>([]);
    const [isGranteesLoading, setIsGranteesLoading] = useState(true);

    const onLoadGranteesSuccess = useCallback(
        (result: GranteeItem[]) => {
            const groupAll = mapShareStatusToGroupAll(shareStatus);
            if (groupAll) {
                setGrantees([...result, groupAll]);
            } else {
                setGrantees(result);
            }

            setIsGranteesLoading(false);
        },
        [setGrantees, shareStatus],
    );

    const onLoadGranteesError = useCallback(() => {
        // eslint-disable-next-line no-console
        console.error("Load grantees error");
    }, []);

    useGetAccessList({ sharedObjectRef, onSuccess: onLoadGranteesSuccess, onError: onLoadGranteesError });

    const owner = useMemo(() => {
        if (sharedObject.createdBy) {
            return mapOwnerToGrantee(createdBy, currentUserRef);
        }
        return mapUserToInactiveGrantee();
    }, [createdBy, currentUserRef]);

    const onSubmit = useCallback(
        (granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => {
            const shareStatus = mapGranteesToShareStatus(grantees, granteesToAdd, granteesToDelete);
            const isUnderStrictControl = shareStatus !== "public";
            const add = mapGranteesToAccessGrantees(granteesToAdd);
            const del = mapGranteesToAccessGrantees(granteesToDelete);
            onApply({ shareStatus, isUnderStrictControl, granteesToAdd: add, granteesToDelete: del });
        },
        [grantees, onApply],
    );

    return (
        <IntlWrapper locale={locale}>
            <BackendProvider backend={effectiveBackend}>
                <WorkspaceProvider workspace={effectiveWorkspace}>
                    <ShareDialogBase
                        isGranteesLoading={isGranteesLoading}
                        owner={owner}
                        grantees={grantees}
                        onCancel={onCancel}
                        onSubmit={onSubmit}
                    />
                </WorkspaceProvider>
            </BackendProvider>
        </IntlWrapper>
    );
};
