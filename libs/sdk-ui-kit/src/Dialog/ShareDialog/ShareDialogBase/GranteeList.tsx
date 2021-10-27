// (C) 2021 GoodData Corporation
import React from "react";
import { GranteeItemComponent } from "./GranteeItem";

import { IGranteesListProps } from "./types";

/**
 * @internal
 */
export const GranteeList = (props: IGranteesListProps): JSX.Element => {
    const { grantees, mode, onDelete } = props;
    return (
        <div>
            {grantees.map((grantee) => {
                return (
                    <GranteeItemComponent
                        key={grantee.id}
                        grantee={grantee}
                        mode={mode}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
};
