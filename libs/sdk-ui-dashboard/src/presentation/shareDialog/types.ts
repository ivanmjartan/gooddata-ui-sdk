// (C) 2019-2021 GoodData Corporation
import { ComponentType } from "react";
import { IAccessControlAware, ShareStatus } from "@gooddata/sdk-backend-spi";
import { IAuditableUsers, ObjRef } from "@gooddata/sdk-model";

/**
 * @alpha
 */
export interface IApplyPayload {
    shareStatus: ShareStatus;
}

/**
 * @alpha
 */
export interface IShareDialogProps {
    /**
     * Is share dialog visible?
     */
    isVisible?: boolean;

    /**
     * object to share
     */
    sharedObject: IAccessControlAware & IAuditableUsers;

    /**
     * Current user reference
     */
    currentUserRef: ObjRef;

    /**
     * Callback to be called when user apply share dialog
     */
    onApply: (payload: IApplyPayload) => void;

    /**
     * Callback to be called, when user closes the share dialog.
     */
    onCancel: () => void;
}

///
/// Custom component types
///

/**
 * @alpha
 */
export type CustomShareDialogComponent = ComponentType;
