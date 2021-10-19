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
import { ShareGranteeBase } from "@gooddata/sdk-ui-kit/src/Dialog/ShareDialog/ShareGranteeBase";

const ShareGranteeBaseBasicExample = (): JSX.Element => {
    return (
        <div id="Share-Grantee-basic-example">
            <ShareGranteeBase
                onCancel={action("onCancel")}
                onSubmit={action("onSubmit")}
                onAddGrantee={action("onAddGrantee")}
            />
        </div>
    );
};

/**
 * @internal
 */
export const ShareGranteeBaseExamples = (): JSX.Element => {
    return (
        <InternalIntlWrapper>
            <div className="library-component screenshot-target">
                <h4>ShareGranteeBase basic example</h4>
                <ShareGranteeBaseBasicExample />
            </div>
        </InternalIntlWrapper>
    );
};

storiesOf(`${UiKit}/ShareDialog/ShareGranteeBase`, module).add(
    "full-featured",
    () => withMultipleScreenshots(<ShareGranteeBaseExamples />, {}), // Props TBD
);
storiesOf(`${UiKit}/ShareDialog/ShareGranteeBase`, module).add(
    "themed",
    () => withMultipleScreenshots(wrapWithTheme(<ShareGranteeBaseExamples />), {}), // Props TBD
);
