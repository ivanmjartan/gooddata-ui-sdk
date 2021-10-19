// (C) 2021 GoodData Corporation
import React from "react";

/**
 * @internal
 */
export type GranteeType = "User" | "Group";

/**
 * @internal
 */
export interface IGranteeItemProps {
    granteeType: GranteeType;
    granteeName: string;
    granteeEmail: string;
    isYou: boolean;
}

export const GranteeItem = (props: IGranteeItemProps): JSX.Element => {
    const { granteeName } = props;

    return <div> {granteeName} </div>;
};
