// (C) 2021 GoodData Corporation

import { ObjRef } from "@gooddata/sdk-model";

import { IWorkspaceUser } from "../users";
import { IWorkspaceUserGroup } from "../userGroups";

/**
 * User having access to the object.
 *
 * @alpha
 */
export interface IUserAccess {
    user: IWorkspaceUser;
}

/**
 * User group having access to the object.
 *
 * @alpha
 */
export interface IUserGroupAccess {
    userGroup: IWorkspaceUserGroup;
}

/**
 * Entity having access to the object.
 *
 * @alpha
 */
export type AccessGranteeDetail = IUserAccess | IUserGroupAccess;

/**
 * New grantee specification.
 *
 * @alpha
 */
export interface IAccessGrantee {
    granteeRef: ObjRef;
}

/**
 * Service to manage access to the objects.
 *
 * @alpha
 */
export interface IWorkspaceAccessControlService {
    getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]>;

    grantAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void>;

    revokeAccess(sharedObject: ObjRef, grantess: IAccessGrantee[]): Promise<void>;
}
