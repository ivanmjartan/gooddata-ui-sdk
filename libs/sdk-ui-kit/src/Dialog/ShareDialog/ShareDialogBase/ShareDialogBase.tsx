// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import { areObjRefsEqual } from "@gooddata/sdk-model";
import { Overlay } from "../../../Overlay";
import { IAlignPoint } from "../../../typings/positioning";
import { ShareGranteeBase } from "./ShareGranteeBase";
import { AddGranteeBase } from "./AddGranteeBase";
import { DialogModeType, GranteeItem, IShareDialogBaseProps } from "./types";
import { notInArrayFilter, getAppliedGrantees } from "./utils";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

const useShareDialogBase = (props: IShareDialogBaseProps) => {
    const { onSubmit, grantees } = props;
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
            setGranteesToAdd((state) => state.filter((g) => !areObjRefsEqual(g.id, grantee.id)));
        },
        [setGranteesToAdd],
    );

    const onGranteeAdd = useCallback(
        (grantee: GranteeItem) => {
            setGranteesToAdd((state) => [...state, grantee]);
        },
        [setGranteesToAdd],
    );

    const isShareDialogDirty = useMemo(() => {
        return granteesToDelete.length !== 0;
    }, [granteesToDelete]);

    const isAddDialogDirty = useMemo(() => {
        return granteesToAdd.length !== 0;
    }, [granteesToDelete, granteesToAdd]);

    const onSubmitShareGrantee = useCallback(() => {
        if (!isShareDialogDirty) {
            return;
        }
        onSubmit(granteesToAdd, granteesToDelete);
    }, [granteesToAdd, granteesToDelete, isShareDialogDirty, onSubmit]);

    const onSubmitAddGrantee = useCallback(() => {
        if (!isAddDialogDirty) {
            return;
        }
        onSubmit(granteesToAdd, granteesToDelete);
    }, [granteesToAdd, granteesToDelete, isAddDialogDirty, onSubmit]);

    const filteredGrantees = useMemo(() => {
        return notInArrayFilter(grantees, granteesToDelete);
    }, [grantees, granteesToDelete]);

    const appliedGrantees = useMemo(() => {
        return getAppliedGrantees(grantees, granteesToAdd, granteesToDelete);
    }, [grantees, granteesToDelete, granteesToAdd]);

    return {
        onAddedGranteeDelete,
        onSharedGranteeDelete,
        onAddGranteeBackClick,
        onAddGranteeButtonClick,
        onGranteeAdd,
        onSubmitShareGrantee,
        onSubmitAddGrantee,
        granteesToAdd,
        dialogMode,
        isShareDialogDirty,
        isAddDialogDirty,
        filteredGrantees,
        appliedGrantees,
    };
};

/**
 * @internal
 */
export const ShareDialogBase: React.FC<IShareDialogBaseProps> = (props) => {
    const { onCancel, owner, isGranteesLoading } = props;

    const {
        onAddedGranteeDelete,
        onSharedGranteeDelete,
        onAddGranteeBackClick,
        onAddGranteeButtonClick,
        onGranteeAdd,
        onSubmitShareGrantee,
        onSubmitAddGrantee,
        granteesToAdd,
        dialogMode,
        isShareDialogDirty,
        isAddDialogDirty,
        filteredGrantees,
        appliedGrantees,
    } = useShareDialogBase(props);

    return (
        <Overlay
            alignPoints={alignPoints}
            isModal={true}
            positionType="fixed"
            className="gd-share-dialog-overlay"
        >
            <div className="s-gd-share-dialog">
                {dialogMode === "ShareGrantee" ? (
                    <ShareGranteeBase
                        isLoading={isGranteesLoading}
                        isDirty={isShareDialogDirty}
                        owner={owner}
                        grantees={filteredGrantees}
                        onCancel={onCancel}
                        onSubmit={onSubmitShareGrantee}
                        onAddGranteeButtonClick={onAddGranteeButtonClick}
                        onGranteeDelete={onSharedGranteeDelete}
                    />
                ) : (
                    <AddGranteeBase
                        isDirty={isAddDialogDirty}
                        appliedGrantees={appliedGrantees}
                        addedGrantees={granteesToAdd}
                        onAddUserOrGroups={onGranteeAdd}
                        onDelete={onAddedGranteeDelete}
                        onCancel={onCancel}
                        onSubmit={onSubmitAddGrantee}
                        onBackClick={onAddGranteeBackClick}
                    />
                )}
            </div>
        </Overlay>
    );
};
