// (C) 2020 GoodData Corporation
import React from "react";
import { useShareDialogProps } from "./ShareDialogPropsContext";
import { ShareDialog } from "@gooddata/sdk-ui-kit";
import { uriRef } from "@gooddata/sdk-model";

/**
 * @internal
 */
export const DefaultShareDialogInner = (): JSX.Element | null => {
    const { isVisible } = useShareDialogProps();

    if (!isVisible) {
        return null;
    }

    return <ShareDialog currentUserRef={uriRef("aaaa")} />;
};
