// (C) 2021 GoodData Corporation
import React from "react";
import { GranteeItem } from "./GranteeItem";

import { GranteeType } from "./types";

/**
 * @internal
 */
export interface IGranteesListProps {
    grantees: GranteeType[];
    onDelete: (grantee: GranteeType) => void;
}

/**
 * @internal
 */
export const GranteeList = (props: IGranteesListProps): JSX.Element => {
    const { grantees, onDelete } = props;
    return (
        <div>
            {grantees.map((grantee) => {
                return <GranteeItem key={grantee.id} grantee={grantee} onDelete={onDelete} />;
            })}
        </div>
    );
};
