// (C) 2021 GoodData Corporation
import { IAccessControlAware, IAccessGrantee, IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { ShareStatus } from "@gooddata/sdk-backend-spi";
import { IAuditableUsers, ObjRef } from "@gooddata/sdk-model";

/**
 * @internal
 */
export interface ISharingApplyPayload {
    shareStatus: ShareStatus;
    isUnderStrictControl: boolean;
    granteesToAdd: IAccessGrantee[];
    granteesToDelete: IAccessGrantee[];
}

/**
 * @internal
 */
export interface IShareDialogProps {
    backend: IAnalyticalBackend;
    workspace: string;
    sharedObject: IAccessControlAware & IAuditableUsers;
    currentUserRef: ObjRef;
    locale?: string;
    onApply: (payload: ISharingApplyPayload) => void;
    onCancel: () => void;
}
