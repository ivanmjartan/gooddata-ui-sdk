// (C) 2019-2021 GoodData Corporation
import { ObjRef } from "@gooddata/sdk-model";
import { IPagedResource } from "../../common/paging";

/**
 * User Group
 * @alpha
 */
export interface IWorkspaceUserGroup {
    /**
     * Stored user group reference
     */
    ref: ObjRef;
    /**
     * Stored user group id (unfortunately some of bear API need group URI and some its id, so we need to keep both of them)
     */
    id?: string;
    /**
     * Group name
     */
    name?: string;
    /**
     * Group description
     */
    description?: string;
}

/**
 * Configuration options for querying user groups
 *
 * @alpha
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
 * @alpha
 */
export interface IWorkspaceUserGroupsQuery {
    /**
     * Starts the user groups query.
     *
     * @returns promise with a list of all user groups matching the specified options
     */
    query(options: IWorkspaceUserGroupsQueryOptions): Promise<IWorkspaceUserGroupsQueryResult>;
}

/**
 * Paged result of user groups query. Last page of data returns empty items.
 *
 * @alpha
 */
export type IWorkspaceUserGroupsQueryResult = IPagedResource<IWorkspaceUserGroup>;
