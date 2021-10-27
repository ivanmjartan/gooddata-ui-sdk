// (C) 2021 GoodData Corporation
import React from "react";
import { FormattedMessage } from "react-intl";
import { BubbleHoverTrigger } from "../../Bubble/BubbleHoverTrigger";
import { Bubble } from "../../Bubble";
import { DialogModeType } from "./types";

const alignPoints = [{ align: "cr cl" }];

export interface IGranteeRemoveIconProps {
    mode: DialogModeType;
    onClick: () => void;
}

export const GranteeUserIcon = (): JSX.Element => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon gd-grantee-icon-user gd-grantee-item-icon-left" />
        </div>
    );
};

export const GranteeGroupIcon = (): JSX.Element => {
    return (
        <div className="gd-grantee-item-icon-left-background">
            <span className="gd-grantee-item-icon gd-grantee-icon-group gd-grantee-item-icon-left" />
        </div>
    );
};

export const GranteeRemoveIcon = (props: IGranteeRemoveIconProps): JSX.Element => {
    const { onClick, mode } = props;

    return (
        <BubbleHoverTrigger showDelay={0} hideDelay={0} className="gd-grantee-item-delete">
            <span
                className="gd-grantee-item-icon gd-grantee-icon-trash gd-grantee-item-icon-right"
                onClick={onClick}
            />
            <Bubble className="bubble-primary" alignPoints={alignPoints}>
                {mode === "ShareGrantee" ? (
                    <FormattedMessage id={"shareDialog.share.grantee.item.remove.access"} />
                ) : (
                    <FormattedMessage id={"shareDialog.share.grantee.item.remove.selection"} />
                )}
            </Bubble>
        </BubbleHoverTrigger>
    );
};

export const GranteeOwnerRemoveIcon = (): JSX.Element => {
    return (
        <BubbleHoverTrigger showDelay={0} hideDelay={0} className="gd-grantee-item-delete-owner">
            <span className="gd-grantee-item-icon gd-grantee-item-icon-owner gd-grantee-item-icon-right">
                <FormattedMessage id={"shareDialog.share.grantee.item.creator"} />
            </span>
            <Bubble className="bubble-primary" alignPoints={alignPoints}>
                <FormattedMessage id={"shareDialog.share.grantee.item.owner.remove.access"} />
            </Bubble>
        </BubbleHoverTrigger>
    );
};
