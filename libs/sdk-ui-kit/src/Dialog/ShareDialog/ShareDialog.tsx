// (C) 2021 GoodData Corporation
import React, { useCallback, useState } from "react";
import { Overlay } from "../../Overlay";
import { IAlignPoint } from "../../typings/positioning";
import { ShareGranteeBase } from "./ShareGranteeBase";
import { AddGranteeBase } from "./AddGranteeBase";

const alignPoints: IAlignPoint[] = [{ align: "cc cc" }];

/**
 * @internal
 */
export interface IShareDialogProps {
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
enum DialogMode {
    ShareGrantee,
    AddGrantee,
}

/**
 * @internal
 */
export const ShareDialog = (props: IShareDialogProps): JSX.Element => {
    const { onCancel, onSubmit } = props;
    const [dialogMode, setDialogMode] = useState(DialogMode.ShareGrantee);

    const onAddGrantee = useCallback(() => {
        setDialogMode(DialogMode.ShareGrantee);
    }, [setDialogMode]);

    return (
        <Overlay
            alignPoints={alignPoints}
            isModal
            positionType="fixed"
            //containerClassName={containerClassName}
        >
            {dialogMode === DialogMode.ShareGrantee ? (
                <ShareGranteeBase onCancel={onCancel} onSubmit={onSubmit} onAddGrantee={onAddGrantee} />
            ) : (
                <AddGranteeBase onCancel={onCancel} onSubmit={onSubmit} onBackClick={onAddGrantee} />
            )}
        </Overlay>
    );
};
