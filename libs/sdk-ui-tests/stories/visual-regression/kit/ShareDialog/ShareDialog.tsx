// (C) 2021 GoodData Corporation
import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import { Button, ShareDialog } from "@gooddata/sdk-ui-kit";
import { UiKit } from "../../../_infra/storyGroups";
import { withMultipleScreenshots } from "../../../_infra/backstopWrapper";
import { wrapWithTheme } from "../../themeWrapper";

import "@gooddata/sdk-ui-kit/styles/css/main.css";
import "../styles/goodstrap.scss";
import { action } from "@storybook/addon-actions";

const ShareDialogBasicExample = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const renderContent = () => {
        return (
            <ShareDialog
                onCancel={() => setIsOpen(false)}
                onSubmit={(values: any) => {
                    action("onSubmit", values)();
                    setIsOpen(false);
                }}
            />
        );
    };

    return (
        <div id="Share-dialog-example">
            <Button
                value="Open share dialog"
                className="gd-button-positive s-export-dialog-button"
                onClick={() => {
                    setIsOpen((open) => !open);
                }}
            />
            {isOpen && renderContent()}
        </div>
    );
};

/**
 * @internal
 */
export const ShareDialogExamples = (): JSX.Element => {
    return (
        <div className="library-component screenshot-target" style={{ height: 400 }}>
            <h4>Share dialog basic example</h4>
            <ShareDialogBasicExample />
        </div>
    );
};

storiesOf(`${UiKit}/ShareDialog`, module).add(
    "full-featured",
    () => withMultipleScreenshots(<ShareDialogExamples />, {}), // Props TBD
);
storiesOf(`${UiKit}/ShareDialog`, module).add(
    "themed",
    () => withMultipleScreenshots(wrapWithTheme(<ShareDialogExamples />), {}), // Props TBD
);
