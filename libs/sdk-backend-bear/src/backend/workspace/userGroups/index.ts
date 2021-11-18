// (C) 2021 GoodData Corporation
import {
    IWorkspaceUserGroupsQuery,
    IWorkspaceUserGroupsQueryOptions,
    IWorkspaceUserGroup,
    IWorkspaceUserGroupsQueryResult,
} from "@gooddata/sdk-backend-spi";

import { BearAuthenticatedCallGuard } from "../../../types/auth";
import { convertWorkspaceUserGroup } from "../../../convertors/fromBackend/UserGroupsConverter";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
import { GdcUserGroup } from "@gooddata/api-model-bear";

export class BearWorkspaceUserGroupsQuery implements IWorkspaceUserGroupsQuery {
    constructor(private readonly authCall: BearAuthenticatedCallGuard, private readonly workspace: string) {}

    private async queryAllPages(limit: number): Promise<GdcUserGroup.IUserGroupItem[]> {
        const data = await this.authCall((sdk) => sdk.project.getUserGroups(this.workspace, { limit }));
        const { items, paging } = data.userGroups;

        const getNextPage = async (
            nextUri: string | null | undefined,
            result: GdcUserGroup.IUserGroupItem[] = [],
        ): Promise<GdcUserGroup.IUserGroupItem[]> => {
            if (!nextUri) {
                return result;
            }

            const data = await this.authCall((sdk) =>
                sdk.xhr.getParsed<GdcUserGroup.IGetUserGroupsResponse>(nextUri!),
            );
            const { items, paging } = data.userGroups;
            const updatedResult = [...result, ...items];
            nextUri = paging.next!;

            return getNextPage(paging.next, updatedResult);
        };

        return getNextPage(paging.next, items);
    }

    public async query(options: IWorkspaceUserGroupsQueryOptions): Promise<IWorkspaceUserGroupsQueryResult> {
        // TODO INE increase limit to 100 once tested
        const { offset = 0, limit = 1, search } = options;
        let userGroups: GdcUserGroup.IUserGroupItem[] = await this.queryAllPages(limit);
        if (search) {
            const lowercaseSearch = search.toLocaleLowerCase();
            userGroups = userGroups.filter((userGroup) => {
                const { name } = userGroup.userGroup.content;
                return name && name.toLowerCase().indexOf(lowercaseSearch) > -1;
            });
        }
        const convertedUserGroups: IWorkspaceUserGroup[] = userGroups.map(convertWorkspaceUserGroup);
        return new InMemoryPaging<IWorkspaceUserGroup>(convertedUserGroups, limit, offset);
    }
}
