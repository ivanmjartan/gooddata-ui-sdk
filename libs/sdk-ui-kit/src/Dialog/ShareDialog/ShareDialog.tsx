// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase";
import { GranteeItem } from "./ShareDialogBase/types";
import { IShareDialogProps } from "./types";
import {
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

/**
 * @internal
 */
export const ShareDialog: React.FC<IShareDialogProps> = (props) => {
    const { backend, workspace, locale, sharedObject, currentUserRef, onApply, onCancel } = props;
    const { createdBy, shareStatus } = sharedObject;

    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);

    const owner = useMemo(() => {
        if (sharedObject.createdBy) {
            return mapOwnerToGrantee(createdBy, currentUserRef);
        }
        return mapUserToInactiveGrantee();
    }, [createdBy, currentUserRef]);

    const grantees = useMemo(() => {
        const groupAll = mapShareStatusToGroupAll(shareStatus);
        if (groupAll) {
            return [groupAll];
        }
        return [];
    }, [shareStatus]);

    const onSubmit = useCallback(
        (granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => {
            const shareStatus = mapGranteesToShareStatus(grantees, granteesToAdd, granteesToDelete);
            const isUnderStrictControl = shareStatus !== "public";
            onApply({ shareStatus, isUnderStrictControl });
        },
        [grantees, onApply],
    );

    return (
        <IntlWrapper locale={locale}>
            <BackendProvider backend={effectiveBackend}>
                <WorkspaceProvider workspace={effectiveWorkspace}>
                    <ShareDialogBase
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
