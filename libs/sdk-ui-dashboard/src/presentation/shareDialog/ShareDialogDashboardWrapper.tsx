// (C) 2020 GoodData Corporation
import React, { useCallback, useMemo } from "react";
import { useToastMessage } from "@gooddata/sdk-ui-kit";
import {
    useDashboardSelector,
    selectIsShareDialogOpen,
    useDashboardDispatch,
    uiActions,
    selectPersistedDashboard,
    selectUserRef,
    useDashboardCommandProcessing,
    changeSharing,
} from "../../model";
import { ShareDialog } from "./ShareDialog";
import { ShareDialogPropsProvider } from "./ShareDialogPropsContext";
import { IApplyPayload } from "./types";

/**
 * @internal
 */
export const ShareDialogDashboardWrapper = (): JSX.Element | null => {
    const dispatch = useDashboardDispatch();
    const { addSuccess, addError } = useToastMessage();
    const isShareDialogOpen = useDashboardSelector(selectIsShareDialogOpen);
    const persistedDashboard = useDashboardSelector(selectPersistedDashboard);
    const currentUserRef = useDashboardSelector(selectUserRef);

    const closeShareDialog = useMemo(() => {
        return () => dispatch(uiActions.closeShareDialog());
    }, [dispatch, uiActions]);

    const { run: runChangeSharing } = useDashboardCommandProcessing({
        commandCreator: changeSharing,
        successEvent: "GDC.DASH/EVT.SHARING.CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        onSuccess: () => {
            addSuccess({ id: "messages.sharingChangedSuccess" });
        },
        onError: () => {
            addError({ id: "messages.sharingChangedError.general" });
        },
    });

    const onCloseShareDialog = useCallback(() => {
        closeShareDialog();
    }, [closeShareDialog]);

    const onApplyShareDialog = useCallback(
        (payload: IApplyPayload) => {
            const { shareStatus } = payload;
            closeShareDialog();
            runChangeSharing(shareStatus);
        },
        [closeShareDialog, runChangeSharing],
    );

    if (isShareDialogOpen) {
        return (
            <ShareDialogPropsProvider
                isVisible={isShareDialogOpen}
                currentUserRef={currentUserRef}
                sharedObject={persistedDashboard!}
                onCancel={onCloseShareDialog}
                onApply={onApplyShareDialog}
            >
                <ShareDialog />
            </ShareDialogPropsProvider>
        );
    }

    return null;
};
