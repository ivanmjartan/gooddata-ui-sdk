// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import { Overlay } from "../../../Overlay";
import { IAlignPoint } from "../../../typings/positioning";
import { ShareGranteeBase } from "./ShareGranteeBase";
import { AddGranteeBase } from "./AddGranteeBase";
import { DialogModeType, GranteeItem, IShareDialogBaseProps } from "./types";
import { filterNotInArray } from "./utils";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

const availableGranteesConst: GranteeItem[] = [
    {
        id: "groupAll",
        granteeType: "groupAll",
        granteeCount: 11,
    },
];

/**
 * @internal
 */
export const ShareDialogBase = (props: IShareDialogBaseProps): JSX.Element => {
    const { onCancel, onSubmit, owner, grantees } = props;
    const [dialogMode, setDialogMode] = useState<DialogModeType>("ShareGrantee");
    const [granteesToAdd, setGranteesToAdd] = useState<GranteeItem[]>([]);
    const [granteesToDelete, setGranteesToDelete] = useState<GranteeItem[]>([]);

    const onAddGranteeButtonClick = useCallback(() => {
        setDialogMode("AddGrantee");
    }, [setDialogMode]);

    const onAddGranteeBackClick = useCallback(() => {
        setDialogMode("ShareGrantee");
        setGranteesToAdd([]);
    }, [setDialogMode, setGranteesToAdd]);

    const onSharedGranteeDelete = useCallback(
        (grantee: GranteeItem) => {
            setGranteesToDelete((state) => [...state, grantee]);
        },
        [setGranteesToDelete],
    );

    const onAddedGranteeDelete = useCallback(
        (grantee: GranteeItem) => {
            setGranteesToAdd((state) => state.filter((g) => g.id !== grantee.id));
        },
        [setGranteesToAdd],
    );

    const onGranteeAdd = useCallback(
        (grantee: GranteeItem) => {
            setGranteesToAdd((state) => [...state, grantee]);
        },
        [setGranteesToAdd],
    );

    const onSubmitCallback = useCallback(() => {
        onSubmit(granteesToAdd, granteesToDelete);
    }, [granteesToAdd, granteesToDelete, onSubmit]);

    const filteredGrantees = useMemo(() => {
        return filterNotInArray(grantees, granteesToDelete);
    }, [grantees, granteesToDelete]);

    const isShareDialogDirty = useMemo(() => {
        return granteesToDelete.length !== 0;
    }, [granteesToDelete]);

    const isAddDialogDirty = useMemo(() => {
        return granteesToAdd.length !== 0;
    }, [granteesToDelete, granteesToAdd]);

    return (
        <Overlay alignPoints={alignPoints} isModal positionType="fixed">
            {dialogMode === "ShareGrantee" ? (
                <ShareGranteeBase
                    isDirty={isShareDialogDirty}
                    owner={owner}
                    grantees={filteredGrantees}
                    onCancel={onCancel}
                    onSubmit={onSubmitCallback}
                    onAddGranteeButtonClick={onAddGranteeButtonClick}
                    onGranteeDelete={onSharedGranteeDelete}
                />
            ) : (
                <AddGranteeBase
                    isDirty={isAddDialogDirty}
                    availableGrantees={availableGranteesConst}
                    addedGrantees={granteesToAdd}
                    onAddUserOrGroups={onGranteeAdd}
                    onDelete={onAddedGranteeDelete}
                    onCancel={onCancel}
                    onSubmit={onSubmitCallback}
                    onBackClick={onAddGranteeBackClick}
                />
            )}
        </Overlay>
    );
};
