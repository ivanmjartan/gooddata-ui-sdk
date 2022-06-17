// (C) 2022 GoodData Corporation
import React from "react";
import { AttributeDropdownBody, IAttributeDropdownBodyProps } from "./AttributeDropdownBody";
import { AttributeDropdownAllFilteredOutBody } from "./AttributeDropdownAllFilteredOutBody";
import { useIntl } from "react-intl";
import { NoData } from "@gooddata/sdk-ui-kit";

interface IAttributeFilterButtonDefaultDropdownBodyProps {
    allElementsFiltered: boolean;
    onApplyButtonClicked: (closeDropdown: () => void) => void;
    closeDropdown: () => void;
    hasNoData: boolean;
    bodyProps: IAttributeDropdownBodyProps;
}

//TOTO: maybe this could be merged with AttributeDropdownBody
export const AttributeFilterButtonDefaultDropdownBody: React.FC<
    IAttributeFilterButtonDefaultDropdownBodyProps
> = (props) => {
    const { allElementsFiltered, onApplyButtonClicked, closeDropdown, hasNoData, bodyProps } = props;

    const intl = useIntl();

    return allElementsFiltered ? (
        <AttributeDropdownAllFilteredOutBody
            parentFilterTitles={bodyProps.parentFilterTitles}
            onApplyButtonClick={() => onApplyButtonClicked(closeDropdown)}
            onCancelButtonClick={closeDropdown}
        />
    ) : hasNoData ? (
        <NoData noDataLabel={intl.formatMessage({ id: "attributesDropdown.noData" })} />
    ) : (
        <AttributeDropdownBody {...bodyProps} />
    );
};
