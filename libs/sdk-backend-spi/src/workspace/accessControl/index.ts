// (C) 2021 GoodData Corporation

import { ObjRef } from "@gooddata/sdk-model";

import { IWorkspaceUser } from "../users";
import { IWorkspaceUserGroup } from "../userGroups";

export interface IUserAccess {
    user: IWorkspaceUser;
}

export interface IUserGroupAccess {
    userGroup: IWorkspaceUserGroup;
}

export type AccessGranteeDetail = IUserAccess | IUserGroupAccess;

export interface IAccessGrantee {
    granteeRef: ObjRef;
}

export interface IWorkspaceAccessControlService {
    getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]>;

    grantAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void>;

    revokeAccess(sharedObject: ObjRef, grantess: IAccessGrantee[]): Promise<void>;
}
