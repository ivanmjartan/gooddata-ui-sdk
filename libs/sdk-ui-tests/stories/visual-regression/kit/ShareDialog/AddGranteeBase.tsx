// (C) 2021 GoodData Corporation
import React from "react";
import { storiesOf } from "@storybook/react";
import { InternalIntlWrapper } from "@gooddata/sdk-ui-ext/dist/internal/utils/internalIntlProvider";
import { UiKit } from "../../../_infra/storyGroups";
import { withMultipleScreenshots } from "../../../_infra/backstopWrapper";
import { wrapWithTheme } from "../../themeWrapper";

import "@gooddata/sdk-ui-kit/styles/css/main.css";
import "../styles/goodstrap.scss";
import { action } from "@storybook/addon-actions";
import { AddGranteeBase } from "@gooddata/sdk-ui-kit/src/Dialog/ShareDialog/AddGranteeBase";

const BasicExample = (): JSX.Element => {
    return (
        <div id="Share-Grantee-base-basic-example">
            <AddGranteeBase
                onCancel={action("onCancel")}
                onSubmit={action("onSubmit")}
                onBackClick={action("onBackClick")}
            />
        </div>
    );
};

/**
 * @internal
 */
export const AddGranteeBaseExamples = (): JSX.Element => {
    return (
        <InternalIntlWrapper>
            <div className="library-component screenshot-target">
                <h4>AddGranteeBase basic example</h4>
                <BasicExample />
            </div>
        </InternalIntlWrapper>
    );
};

storiesOf(`${UiKit}/ShareDialog/AddGranteeBase`, module).add(
    "full-featured",
    () => withMultipleScreenshots(<AddGranteeBaseExamples />, {}), // Props TBD
);
storiesOf(`${UiKit}/ShareDialog/AddGranteeBase`, module).add(
    "themed",
    () => withMultipleScreenshots(wrapWithTheme(<AddGranteeBaseExamples />), {}), // Props TBD
);
