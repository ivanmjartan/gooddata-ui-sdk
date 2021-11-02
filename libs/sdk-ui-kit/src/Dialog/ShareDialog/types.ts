// (C) 2021 GoodData Corporation
import { IAccessControlAware } from "@gooddata/sdk-backend-spi";
import { ShareStatus } from "@gooddata/sdk-backend-spi";
import { IAuditableUsers, ObjRef } from "@gooddata/sdk-model";

/**
 * @internal
 */
export interface IApplyPayload {
    shareStatus: ShareStatus;
}

/**
 * @internal
 */
export interface IShareDialogProps {
    sharedObject: IAccessControlAware & IAuditableUsers;
    currentUserRef: ObjRef;
    locale?: string;
    onApply: (payload: IApplyPayload) => void;
    onCancel: () => void;
}
