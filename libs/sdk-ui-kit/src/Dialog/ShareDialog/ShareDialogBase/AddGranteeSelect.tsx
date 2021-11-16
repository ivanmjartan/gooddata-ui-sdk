// (C) 2021 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";

import { useIntl } from "react-intl";
import { ValueType, components as ReactSelectComponents, InputProps } from "react-select";
import AsyncSelect from "react-select/async";
import { IAddGranteeSelectProps, ISelectOption } from "./types";
import { mapWorkspaceUserToGrantee } from "../shareDialogMappers";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { getGranteeLabel } from "./utils";
import debounce from "debounce-promise";
//import { getGranteeLabel, notInArrayFilter } from './utils';
// import { areObjRefsEqual } from '@gooddata/sdk-model';

/* import throttle from "lodash/throttle";

// import { getGranteeItemTestId } from "./utils";
*/
const SEARCH_INTERVAL = 400;

/**
 * @internal
 */
export const AddGranteeSelect: React.FC<IAddGranteeSelectProps> = (props) => {
    const { addedGrantees, onSelectGrantee } = props;

    const backend = useBackendStrict();
    const workspace = useWorkspaceStrict();

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

    const Option = (props: any): JSX.Element => {
        // const { value } = props;
        // const idStyle = getGranteeItemTestId(value, "option");
        const idStyle = "aa";
        return (
            <div className={idStyle}>
                <ReactSelectComponents.Option {...props} />
            </div>
        );
    };

    const loadOptions = useMemo(
        () =>
            debounce(
                async (inputValue: string): Promise<ISelectOption[]> => {
                    let loader = backend.workspace(workspace).users();
                    if (inputValue) {
                        loader = loader.withOptions({ search: `%${inputValue}` });
                    }
                    const workspaceUsers = await loader.queryAll();

                    return workspaceUsers.map((user) => {
                        const grantee = mapWorkspaceUserToGrantee(user);

                        return {
                            label: getGranteeLabel(grantee, intl),
                            value: mapWorkspaceUserToGrantee(user),
                        };
                    });
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
                components={{ DropdownIndicator, IndicatorSeparator, Input: InputRendered, Option }}
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
