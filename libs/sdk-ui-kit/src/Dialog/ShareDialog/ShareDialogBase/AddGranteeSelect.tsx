// (C) 2021 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import debounce from "debounce-promise";
import { useIntl } from "react-intl";
import { ValueType } from "react-select";
import AsyncSelect from "react-select/async";
import { useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";
import {
    IAnalyticalBackend,
    IWorkspaceUserGroupsQueryOptions,
    IWorkspaceUsersQueryOptions,
} from "@gooddata/sdk-backend-spi";
import { areObjRefsEqual } from "@gooddata/sdk-model";

import { IAddGranteeSelectProps, IGroupedOption, ISelectOption } from "./types";
import { mapWorkspaceUserGroupToGrantee, mapWorkspaceUserToGrantee } from "../shareDialogMappers";
import { getGranteeLabel, GranteeGroupAll, hasGroupAll, sortGranteesByName } from "./utils";

import {
    EmptyRenderer,
    GroupHeadingRenderer,
    InputRendered,
    LoadingMessageRenderer,
    OptionRenderer,
} from "./AsyncSelectComponents";

const SEARCH_INTERVAL = 400;

/**
 * @internal
 */
export const AddGranteeSelect: React.FC<IAddGranteeSelectProps> = (props) => {
    const { appliedGrantees, onSelectGrantee } = props;

    const backend: IAnalyticalBackend = useBackendStrict();
    const workspace: string = useWorkspaceStrict();

    const intl = useIntl();
    const selectRef = useRef<AsyncSelect<ISelectOption, false>>(null);

    useEffect(() => {
        selectRef?.current.focus();
    }, []);

    const onSelect = useCallback(
        (value: ValueType<ISelectOption, boolean>) => {
            const grantee = (value as ISelectOption).value;
            onSelectGrantee(grantee);
        },
        [onSelectGrantee],
    );

    const noOptionsMessage = useMemo(
        () => () => {
            return intl.formatMessage({
                id: "shareDialog.share.grantee.add.search.no.matching.items",
            });
        },
        [],
    );

    const loadOptions = useMemo(
        () =>
            debounce(
                async (inputValue: string): Promise<IGroupedOption[]> => {
                    let usersOption: IWorkspaceUsersQueryOptions = {};
                    let groupsOption: IWorkspaceUserGroupsQueryOptions = {};

                    if (inputValue) {
                        usersOption = { ...usersOption, search: `%${inputValue}` };
                        groupsOption = { ...groupsOption, search: `${inputValue}` };
                    }

                    try {
                        const workspaceUsersQuery = backend
                            .workspace(workspace)
                            .users()
                            .withOptions(usersOption)
                            .query();
                        const workspaceGroupsQuery = backend
                            .workspace(workspace)
                            .userGroups()
                            .query(groupsOption);

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
                        console.log(ex);
                        return [];
                    }
                },
                SEARCH_INTERVAL,
                { leading: true },
            ),
        [backend, workspace, intl, appliedGrantees],
    );

    const filterOption = (option: any) => {
        const grantee = option.value;
        return !appliedGrantees.some((g) => {
            return areObjRefsEqual(g.id, grantee.id);
        });
    };

    return (
        <div className="gd-share-dialog-content-select">
            <AsyncSelect
                ref={selectRef}
                defaultMenuIsOpen={true}
                classNamePrefix="gd-share-dialog"
                components={{
                    DropdownIndicator: EmptyRenderer,
                    IndicatorSeparator: EmptyRenderer,
                    Input: InputRendered,
                    Option: OptionRenderer,
                    GroupHeading: GroupHeadingRenderer,
                    LoadingMessage: LoadingMessageRenderer,
                    LoadingIndicator: EmptyRenderer,
                }}
                loadOptions={loadOptions}
                defaultOptions={true}
                placeholder={intl.formatMessage({
                    id: "shareDialog.share.grantee.add.search.placeholder",
                })}
                noOptionsMessage={noOptionsMessage}
                onChange={onSelect}
                value={null}
                filterOption={filterOption}
            />
        </div>
    );
};
