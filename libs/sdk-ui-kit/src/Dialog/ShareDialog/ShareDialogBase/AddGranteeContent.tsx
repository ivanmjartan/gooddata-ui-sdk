// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import Select, { ValueType, components, DropdownIndicatorProps } from "react-select";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { GranteeList } from "./GranteeList";
import { GranteeItem, IAddGranteeContentProps } from "./types";
import { getGranteeLabel } from "./utils";
import { Input as InputGD } from "../../../Form";

interface ISelectOption {
    label: string;
    value: GranteeItem;
}

/**
 * @internal
 */
export const AddGranteeContent = (props: IAddGranteeContentProps): JSX.Element => {
    const { availableGrantees, addedGrantees, onDelete, onAddUserOrGroups } = props;
    const intl = useIntl();

    const granteesOption = useMemo(() => {
        return availableGrantees.map((grantee: GranteeItem): ISelectOption => {
            return {
                label: getGranteeLabel(grantee, intl),
                value: grantee,
            };
        });
    }, [availableGrantees, intl]);

    const onSelect = useCallback(
        (value: ValueType<ISelectOption, boolean>) => {
            const grantee = (value as ISelectOption).value; //TODO fix typings
            if (addedGrantees.findIndex((g) => areObjRefsEqual(g.id, grantee.id)) === -1) {
                onAddUserOrGroups(grantee);
            }
        },
        [addedGrantees, onAddUserOrGroups],
    );

    const noOptionsMessage = useMemo(
        () => (_obj: { inputValue: string }) => {
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

    const Input = (props: any): JSX.Element => {
        return <InputGD {...props} />;
    };
    //TODO fix and rename and clean styles

    return (
        <>
            <div className="gd-share-dialog-content-select">
                <Select
                    // className="gd-input"
                    classNamePrefix="gd-share-dialog"
                    components={{ DropdownIndicator, IndicatorSeparator }}
                    options={granteesOption}
                    defaultValue={undefined}
                    placeholder={intl.formatMessage({
                        id: "shareDialog.share.grantee.add.search.placeholder",
                    })}
                    noOptionsMessage={noOptionsMessage}
                    onChange={onSelect}
                    value={null}
                />
            </div>
            <GranteeList grantees={addedGrantees} mode={"AddGrantee"} onDelete={onDelete} />
        </>
    );
};
