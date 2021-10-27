// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import Select, { ValueType } from "react-select";
import { GranteeList } from "./GranteeList";
import { GranteeItem, IAddGranteeContentProps } from "./types";
import { filterNotInArray, getGranteeLabel } from "./utils";

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
        return filterNotInArray(availableGrantees, addedGrantees).map(
            (grantee: GranteeItem): ISelectOption => {
                return {
                    label: getGranteeLabel(grantee, intl),
                    value: grantee,
                };
            },
        );
    }, [availableGrantees, addedGrantees, intl]);

    const onSelect = useCallback(
        (value: ValueType<ISelectOption, boolean>) => {
            const grantee = (value as ISelectOption).value; //TODO fix typings
            if (addedGrantees.findIndex((g) => g === grantee) === -1) {
                onAddUserOrGroups(grantee);
            }
        },
        [onAddUserOrGroups],
    );

    //TODO fix and rename and clean styles

    return (
        <>
            <div className="gd-input gd-recipients-field">
                <Select
                    className="gd-recipients-container"
                    classNamePrefix="gd-recipients"
                    options={granteesOption}
                    defaultValue={undefined}
                    placeholder={intl.formatMessage({
                        id: "shareDialog.share.grantee.add.search.placeholder",
                    })}
                    onChange={onSelect}
                    value={null}
                />
            </div>
            <br />
            <GranteeList grantees={addedGrantees} mode={"AddGrantee"} onDelete={onDelete} />
        </>
    );
};
