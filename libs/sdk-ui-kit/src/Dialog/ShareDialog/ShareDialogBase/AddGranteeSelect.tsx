// (C) 2021 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useIntl } from "react-intl";
import Select, { ValueType, components as ReactSelectComponents } from "react-select";
import { IAddGranteeSelectProps, ISelectOption } from "./types";

/**
 * @internal
 */
export const AddGranteeSelect = (props: IAddGranteeSelectProps): JSX.Element => {
    const { granteesOption, onSelectGrantee } = props;

    const intl = useIntl();
    const selectRef = useRef(null);

    useEffect(() => {
        selectRef.current.focus();
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

    const InputRendered = (props: any): JSX.Element => {
        return (
            <div className="gd-share-dialog-input s-gd-share-dialog-input">
                <ReactSelectComponents.Input {...props} />
            </div>
        );
    };

    return (
        <div className="gd-share-dialog-content-select">
            <Select
                ref={selectRef}
                onInputChange={() => {
                    selectRef.current.select.getNextFocusedOption = () => false;
                }}
                defaultMenuIsOpen={true}
                classNamePrefix="gd-share-dialog"
                components={{ DropdownIndicator, IndicatorSeparator, Input: InputRendered }}
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
    );
};
