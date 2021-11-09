// (C) 2019-2021 GoodData Corporation
import { ObjRef } from "@gooddata/sdk-model";
import { IPagedResource } from "../../common/paging";
import { IWorkspaceUser } from "../users";

/**
 * User
 * @public
 */
export interface IWorkspaceUserGroup {
    /**
     * Stored user group reference
     */
    ref: ObjRef;

    name: string;
    description: string;
}

/**
 * Configuration options for querying user groups
 *
 * @public
 */
export interface IWorkspaceUserGroupsQueryOptions {
    /**
     * Structured prefix filter
     * - disjunctions are separated by colon (',')
     * - conjunctions are separated by space (' ')
     * - basic form match, if it matches as prefix to any of firstName, lastName and email
     */
    search?: string;

    /**
     * Optionally specify (zero-based) starting offset for the results.
     */
    offset?: number;

    /**
     * Optionally specify number of items per page.
     */
    limit?: number;
}

/**
 * Service to query user groups for current workspace
 *
 * @public
 */
export interface IWorkspaceUserGroupsQuery {
    /**
     * Starts the user groups query.
     *
     * @returns promise with a list of all user groups matching the specified options
     */
    query(options: IWorkspaceUserGroupsQueryOptions): IPagedResource<IWorkspaceUserGroup>;
    /**
     * Starts the user groups query.
     *
     * @returns promise with a list of all user groups matching the specified options
     */
    queryMembers(groupRef: ObjRef): IPagedResource<IWorkspaceUser>;
}
