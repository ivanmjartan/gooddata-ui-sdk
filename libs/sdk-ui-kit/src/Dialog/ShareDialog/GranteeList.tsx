// (C) 2021 GoodData Corporation
import React from "react";
import { GranteeItemComponent } from "./GranteeItem";

import { GranteeItem } from "./types";

/**
 * @internal
 */
export interface IGranteesListProps {
    grantees: GranteeItem[];
    onDelete: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export const GranteeList = (props: IGranteesListProps): JSX.Element => {
    const { grantees, onDelete } = props;
    return (
        <div>
            {grantees.map((grantee) => {
                return <GranteeItemComponent key={grantee.id} grantee={grantee} onDelete={onDelete} />;
            })}
        </div>
    );
};
