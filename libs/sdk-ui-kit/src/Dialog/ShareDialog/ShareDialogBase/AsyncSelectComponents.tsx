// (C) 2021 GoodData Corporation
import React from "react";
import { components as ReactSelectComponents, InputProps, OptionProps } from "react-select";
import { Typography } from "../../../Typography";
import { LoadingMask } from "../../../LoadingMask";
import { ISelectOption, isGranteeItem, isGranteeUser } from "./types";
import { getGranteeItemTestId } from "./utils";

export const EmptyRenderer = (): JSX.Element => {
    return null;
};

export const LoadingMessageRenderer = (): JSX.Element => {
    return (
        <div className="gd-share-dialog-loading-mask-container">
            <LoadingMask size="small" />
        </div>
    );
};

export const InputRendered = (props: InputProps): JSX.Element => {
    return (
        <div className="gd-share-dialog-input s-gd-share-dialog-input">
            <ReactSelectComponents.Input {...props} />
        </div>
    );
};

const OptionContentRenderer = (item: ISelectOption): JSX.Element => {
    if (isGranteeUser(item.value)) {
        return (
            <>
                {item.value.name} <span className={"option-email"}>{item.value.email}</span>
            </>
        );
    }

    return <> {item.label} </>;
};

export const OptionRenderer = (props: OptionProps<ISelectOption, false>): JSX.Element => {
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

    return (
        <div ref={innerRef} className={`${componentStyle} ${sTestStyle}`} {...innerProps}>
            <div className="option-content">{OptionContentRenderer(data)}</div>
        </div>
    );
};

export interface IGroupHeading {
    data: {
        label: string;
    };
}

export const GroupHeadingRenderer = (props: IGroupHeading): JSX.Element => {
    const { label } = props.data;
    return (
        <div className={"gd-share-dialog-select-group-heading"}>
            <Typography tagName="h3">{label}</Typography>
        </div>
    );
};
