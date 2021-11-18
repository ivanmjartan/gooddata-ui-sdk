// (C) 2021 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";

import { useIntl } from "react-intl";
import { ValueType, components as ReactSelectComponents, InputProps, OptionProps } from "react-select";
import AsyncSelect from "react-select/async";
import { IAddGranteeSelectProps, IGroupedOption, ISelectOption, isGranteeItem, isGranteeUser } from "./types";
import { mapWorkspaceUserGroupToGrantee, mapWorkspaceUserToGrantee } from "../shareDialogMappers";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { getGranteeItemTestId, getGranteeLabel } from "./utils";
import debounce from "debounce-promise";
import {
    IAnalyticalBackend,
    IWorkspaceUserGroupsQueryOptions,
    IWorkspaceUsersQueryOptions,
} from "@gooddata/sdk-backend-spi";
import { Typography } from "../../../Typography";
import { LoadingMask } from "../../../LoadingMask";

const SEARCH_INTERVAL = 400;

/**
 * @internal
 */
export const AddGranteeSelect: React.FC<IAddGranteeSelectProps> = (props) => {
    const { addedGrantees, onSelectGrantee } = props;

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

    const DropdownIndicator = (): JSX.Element => {
        return null;
    };

    const IndicatorSeparator = (): JSX.Element => {
        return null;
    };

    const InputRendered = (props: InputProps): JSX.Element => {
        return (
            <div className="gd-share-dialog-input s-gd-share-dialog-input">
                <ReactSelectComponents.Input {...props} />
            </div>
        );
    };

    const LoadingMessage = () => {
        return (
            <div className="gd-share-dialog-loading-mask-container">
                <LoadingMask size="small" />
            </div>
        );
    };

    const LoadingIndicator = (): JSX.Element => {
        return null;
    };

    const Option = (props: OptionProps<ISelectOption, false>): JSX.Element => {
        const { className, cx, isFocused, innerRef, innerProps, data } = props;

        let sTestStyle = "";

        if (isGranteeItem(data.value)) {
            sTestStyle = getGranteeItemTestId(data.value, "option");
        }

        const componentStyle = cx(
            {
                option: true,
                "option--is-focused": isFocused,
            },
            className,
        );

        const optionRenderer = (item: ISelectOption): JSX.Element => {
            if (isGranteeUser(item.value)) {
                return (
                    <>
                        {" "}
                        {item.value.name} <span className={"option-email"}>{item.value.email}</span>{" "}
                    </>
                );
            }

            return <> {item.label} </>;
        };

        return (
            <div ref={innerRef} className={`${componentStyle} ${sTestStyle}`} {...innerProps}>
                <div className={"option-content"}>{optionRenderer(data)}</div>
            </div>
        );
    };

    const GroupHeading = (props: any): JSX.Element => {
        const { label } = props.data;
        return (
            <div className={"gd-share-dialog-select-group-heading"}>
                <Typography tagName="h3">{label}</Typography>
            </div>
        );
    };

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

                        const mappedUsers: ISelectOption[] = workspaceUsers.items.map((user) => {
                            const granteeUser = mapWorkspaceUserToGrantee(user);

                            return {
                                label: getGranteeLabel(granteeUser, intl),
                                value: granteeUser,
                            };
                        });

                        const mappedGroups: ISelectOption[] = workspaceGroups.items.map((userGroup) => {
                            const granteeGroup = mapWorkspaceUserGroupToGrantee(userGroup);

                            return {
                                label: getGranteeLabel(granteeGroup, intl),
                                value: granteeGroup,
                            };
                        });

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
        [backend, workspace, intl],
    );

    const filterOption = (option: any) => {
        const grantee = option.value;
        return !addedGrantees.some((g) => {
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
                    DropdownIndicator,
                    IndicatorSeparator,
                    Input: InputRendered,
                    Option,
                    GroupHeading,
                    LoadingMessage,
                    LoadingIndicator,
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
