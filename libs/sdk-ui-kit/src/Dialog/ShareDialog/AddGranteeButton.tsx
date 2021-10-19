// (C) 2021 GoodData Corporation
import React from "react";
import classNames from "classnames";
import { BubbleHoverTrigger } from "../../Bubble/BubbleHoverTrigger";
import { Bubble } from "../../Bubble";
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

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
    };

    return (
        <div className="create-measure-link-section">
            {" "}
            {/* TODO fix style */}
            <BubbleHoverTrigger showDelay={0} hideDelay={0}>
                <a
                    className={buttonClassNames}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                >
                    <FormattedMessage id="Add" /* TODO Add translation */ />
                </a>
                <Bubble className="bubble-primary" alignPoints={[{ align: "cr cl" }]}>
                    <FormattedMessage
                        id={"Add users or groups"}
                        /* TODO Add translation */
                    />
                </Bubble>
            </BubbleHoverTrigger>
        </div>
    );
};
