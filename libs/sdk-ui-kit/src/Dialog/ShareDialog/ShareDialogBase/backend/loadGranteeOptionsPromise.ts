// (C) 2021 GoodData Corporation
import {
    IAnalyticalBackend,
    IWorkspaceUserGroupsQueryOptions,
    IWorkspaceUsersQueryOptions,
} from "@gooddata/sdk-backend-spi";
import { IntlShape } from "react-intl";

import { GranteeItem, IGroupedOption, ISelectOption } from "../types";
import { getGranteeLabel, GranteeGroupAll, hasGroupAll, sortGranteesByName } from "../utils";
import { mapWorkspaceUserGroupToGrantee, mapWorkspaceUserToGrantee } from "../../shareDialogMappers";

/**
 * @internal
 */
export const loadGranteeOptionsPromise =
    (appliedGrantees: GranteeItem[], backend: IAnalyticalBackend, workspace: string, intl: IntlShape) =>
    async (inputValue: string): Promise<IGroupedOption[]> => {
        let usersOption: IWorkspaceUsersQueryOptions = {};
        let groupsOption: IWorkspaceUserGroupsQueryOptions = {};

        if (inputValue) {
            usersOption = { ...usersOption, search: `%${inputValue}` };
            groupsOption = { ...groupsOption, search: `${inputValue}` };
        }

        try {
            const workspaceUsersQuery = backend.workspace(workspace).users().withOptions(usersOption).query();
            const workspaceGroupsQuery = backend.workspace(workspace).userGroups().query(groupsOption);

            const [workspaceUsers, workspaceGroups] = await Promise.all([
                workspaceUsersQuery,
                workspaceGroupsQuery,
            ]);

            const mappedUsers: ISelectOption[] = workspaceUsers.items
                .map(mapWorkspaceUserToGrantee)
                .sort(sortGranteesByName(intl))
                .map((user) => {
                    return {
                        label: getGranteeLabel(user, intl),
                        value: user,
                    };
                });

            let mappedGroups: ISelectOption[] = workspaceGroups.items
                .map(mapWorkspaceUserGroupToGrantee)
                .sort(sortGranteesByName(intl))
                .map((group) => {
                    return {
                        label: getGranteeLabel(group, intl),
                        value: group,
                    };
                });

            if (!hasGroupAll(appliedGrantees)) {
                const groupAllOption: ISelectOption = {
                    label: getGranteeLabel(GranteeGroupAll, intl),
                    value: GranteeGroupAll,
                };
                mappedGroups = [groupAllOption, ...mappedGroups];
            }

            return [
                {
                    label: "Groups",
                    options: mappedGroups,
                },
                {
                    label: "Users",
                    options: mappedUsers,
                },
            ];
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.error(ex);
            throw ex;
        }
    };

/**
 * @internal
 */
export const loadGranteeOptionsPromiseError =
    (_appliedGrantees: GranteeItem[], _backend: IAnalyticalBackend, _workspace: string, _intl: IntlShape) =>
    async (_inputValue: string): Promise<IGroupedOption[]> => {
        throw "errr";
    };
