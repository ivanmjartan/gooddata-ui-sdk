// (C) 2021 GoodData Corporation
import React, { useCallback } from "react";
import classNames from "classnames";
import { BubbleHoverTrigger, Bubble } from "../../../Bubble";
import { FormattedMessage } from "react-intl";

/**
 * @internal
 */
export interface IAddUserOrGroupButton {
    onClick: () => void;
}

/**
 * @internal
 */
export const AddUserOrGroupButton = (props: IAddUserOrGroupButton): JSX.Element => {
    const { onClick } = props;

    const buttonClassNames = classNames(
        "gd-button",
        "gd-button-link",
        "gd-icon-plus",
        "s-add-users-or-groups",
    );

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            onClick();
        },
        [onClick],
    );

    return (
        <div className="create-measure-link-section">
            {/* TODO fix style */}
            <BubbleHoverTrigger showDelay={0} hideDelay={0}>
                <a
                    className={buttonClassNames}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                >
                    <FormattedMessage id="shareDialog.share.grantee.add" />
                </a>
                <Bubble className="bubble-primary" alignPoints={[{ align: "cr cl" }]}>
                    <FormattedMessage id={"shareDialog.share.grantee.add.info"} />
                </Bubble>
            </BubbleHoverTrigger>
        </div>
    );
};
