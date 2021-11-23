// (C) 2020-2021 GoodData Corporation

import { dummyBackendEmptyData } from "@gooddata/sdk-backend-mockingbird";
import {
    AccessGranteeDetail,
    IAccessGrantee,
    IAnalyticalBackend,
    IWorkspaceAccessControlService,
    IWorkspaceUser,
    IWorkspaceUserGroupsQuery,
    IWorkspaceUserGroupsQueryOptions,
    IWorkspaceUserGroupsQueryResult,
    IWorkspaceUsersQuery,
    IWorkspaceUsersQueryOptions,
    IWorkspaceUsersQueryResult,
} from "@gooddata/sdk-backend-spi";
import { ObjRef } from "@gooddata/sdk-model";
import { noop } from "lodash";

export const workspace = "foo";
const baseBackend = dummyBackendEmptyData();

const noopWorkspaceAccessControlService: IWorkspaceAccessControlService = {
    getAccessList: noop as (sharedObject: ObjRef) => Promise<AccessGranteeDetail[]>,
    grantAccess: noop as (sharedObject: ObjRef, grantees: IAccessGrantee[]) => Promise<void>,
    revokeAccess: noop as (sharedObject: ObjRef, grantess: IAccessGrantee[]) => Promise<void>,
};

const noopUsersQuery: IWorkspaceUsersQuery = {
    withOptions: (_options: IWorkspaceUsersQueryOptions): IWorkspaceUsersQuery => {
        return noopUsersQuery;
    },
    query: noop as () => Promise<IWorkspaceUsersQueryResult>,
    queryAll: noop as () => Promise<IWorkspaceUser[]>,
};

const noopUserGroupsQuery: IWorkspaceUserGroupsQuery = {
    query: noop as (options: IWorkspaceUserGroupsQueryOptions) => Promise<IWorkspaceUserGroupsQueryResult>,
};

export interface IGetMockBackendProps {
    getAccessList: (sharedObjectRef: ObjRef) => Promise<AccessGranteeDetail[]>;
    queryUsers?: () => Promise<IWorkspaceUsersQueryResult>;
    queryGroups?: () => Promise<IWorkspaceUserGroupsQueryResult>;
}

export const getMockBackend = (props: IGetMockBackendProps): IAnalyticalBackend => ({
    ...baseBackend,
    workspace: () => ({
        ...baseBackend.workspace(workspace),
        accessControl: () => ({
            ...noopWorkspaceAccessControlService,
            getAccessList: props.getAccessList,
        }),
        users: () => ({
            ...noopUsersQuery,
            query: props.queryUsers ? props.queryUsers : noopUsersQuery.query,
        }),
        userGroups: () => ({
            ...noopUserGroupsQuery,
            query: props.queryGroups ? props.queryGroups : noopUserGroupsQuery.query,
        }),
    }),
});
