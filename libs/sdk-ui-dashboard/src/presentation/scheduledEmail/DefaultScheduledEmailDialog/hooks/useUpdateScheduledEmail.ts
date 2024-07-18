// (C) 2020-2024 GoodData Corporation
import { useCallback } from "react";
import { FilterContextItem, IAutomationMetadataObject } from "@gooddata/sdk-model";
import {
    CommandProcessingStatus,
    saveScheduledEmail,
    useDashboardCommandProcessing,
} from "../../../../model/index.js";

export const useUpdateScheduledEmail = ({
    onBeforeRun,
    onSuccess,
    onError,
}: {
    onBeforeRun?: (scheduledEmailToSave: IAutomationMetadataObject) => void;
    onSuccess?: () => void;
    onError?: (error: any) => void;
} = {}): {
    save: (scheduledEmailToSave: IAutomationMetadataObject, filters?: FilterContextItem[]) => void;
    savingStatus?: CommandProcessingStatus;
} => {
    const scheduledEmailCommandProcessing = useDashboardCommandProcessing({
        commandCreator: saveScheduledEmail,
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
        successEvent: "GDC.DASH/EVT.SCHEDULED_EMAIL.SAVED",
        onError: (event) => {
            onError?.(event.payload.error);
        },
        onSuccess: () => {
            onSuccess?.();
        },
        onBeforeRun: (cmd) => {
            onBeforeRun?.(cmd.payload.scheduledEmail);
        },
    });

    const save = useCallback(
        (scheduledEmailToSave: IAutomationMetadataObject, filters?: FilterContextItem[]) => {
            scheduledEmailCommandProcessing.run(scheduledEmailToSave, filters);
        },
        [scheduledEmailCommandProcessing],
    );

    return {
        save,
        savingStatus: scheduledEmailCommandProcessing.status,
    };
};