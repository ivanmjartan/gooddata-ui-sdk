// (C) 2021 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import { Overlay } from "../../Overlay";
import { IAlignPoint } from "../../typings/positioning";
import { ShareGranteeBase } from "./ShareGranteeBase";
import { AddGranteeBase } from "./AddGranteeBase";
import { GranteeItem, IShareDialogProps } from "./types";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

/**
 * @internal
 */
enum DialogMode {
    ShareGrantee,
    AddGrantee,
}

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
export const ShareDialog = (props: IShareDialogProps): JSX.Element => {
    const { onCancel, onSubmit, owner, grantees } = props;
    const [dialogMode, setDialogMode] = useState(DialogMode.ShareGrantee);
    const [granteesToAdd, setGranteesToAdd] = useState<GranteeItem[]>([]);
    const [granteesToDelete, setGranteesToDelete] = useState<GranteeItem[]>([]);

    const onAddGranteeButtonClick = useCallback(() => {
        setDialogMode(DialogMode.AddGrantee);
    }, [setDialogMode]);

    const onShareGrantee = useCallback(() => {
        setDialogMode(DialogMode.ShareGrantee);
    }, [setDialogMode]);

    const onGranteeDelete = useCallback(
        (grantee: GranteeItem) => {
            if (granteesToAdd.includes(grantee)) {
                setGranteesToAdd((state) => state.filter((g) => g !== grantee));
            } else {
                setGranteesToDelete((state) => [...state, grantee]);
            }
        },
        [granteesToAdd, setGranteesToAdd, setGranteesToDelete],
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
        const deleteFiltered = grantees.filter((g) => !granteesToDelete.includes(g));

        return [...deleteFiltered, ...granteesToAdd];
    }, [grantees, granteesToDelete, granteesToAdd]);

    const isDirty = useMemo(() => {
        return granteesToDelete.length !== 0 || granteesToAdd.length !== 0;
    }, [granteesToDelete, granteesToAdd]);

    return (
        <Overlay alignPoints={alignPoints} isModal positionType="fixed">
            {dialogMode === DialogMode.ShareGrantee ? (
                <ShareGranteeBase
                    isDirty={isDirty}
                    owner={owner}
                    grantees={filteredGrantees}
                    onCancel={onCancel}
                    onSubmit={onSubmitCallback}
                    onAddGranteeButtonClick={onAddGranteeButtonClick}
                    onGranteeDelete={onGranteeDelete}
                />
            ) : (
                <AddGranteeBase
                    isDirty={isDirty}
                    availableGrantees={availableGranteesConst}
                    addedGrantees={granteesToAdd}
                    onAddUserOrGroups={onGranteeAdd}
                    onDelete={onGranteeDelete}
                    onCancel={onCancel}
                    onSubmit={onSubmitCallback}
                    onBackClick={onShareGrantee}
                />
            )}
        </Overlay>
    );
};
