// (C) 2021 GoodData Corporation
import { useCallback } from "react";
import { useBackendStrict, useCancelablePromise, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { AccessGranteeDetail } from "@gooddata/sdk-backend-spi";
import { mapAccessGranteeDetailToGrantee } from "../shareDialogMappers";
import { ObjRef } from "@gooddata/sdk-model";
import { GranteeItem } from "./types";

/**
 * @internal
 */
interface IUseGetAccessListProps {
    sharedObject: ObjRef;
    onSuccess: (result: GranteeItem[]) => void;
    onError: (err: any) => void;
}

/**
 * @internal
 */
export const useGetAccessList = (props: IUseGetAccessListProps) => {
    const { sharedObject, onSuccess, onError } = props;
    const effectiveBackend = useBackendStrict();
    const effectiveWorkspace = useWorkspaceStrict();

    const promise = () =>
        effectiveBackend.workspace(effectiveWorkspace).accessControl().getAccessList(sharedObject);

    const onSuccessCallBack = useCallback(
        (result: AccessGranteeDetail[]) => {
            const grantees = result.map(mapAccessGranteeDetailToGrantee);
            onSuccess(grantees);
        },
        [onSuccess],
    );

    return useCancelablePromise({ promise, onError, onSuccess: onSuccessCallBack }, [
        effectiveBackend,
        effectiveWorkspace,
        sharedObject,
        onSuccessCallBack,
    ]);
};
