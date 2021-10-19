// (C) 2021 GoodData Corporation
import React from "react";
import { AddUserOrGroupButton } from "./AddGranteeButton";

/**
 * @internal
 */
export interface IShareGranteeContentProps {
    onAddGrantee: () => void;
}

/**
 * @internal
 */
export const ShareGranteeContent = (props: IShareGranteeContentProps): JSX.Element => {
    const { onAddGrantee } = props;

    return <AddUserOrGroupButton onClick={onAddGrantee} />;
};
