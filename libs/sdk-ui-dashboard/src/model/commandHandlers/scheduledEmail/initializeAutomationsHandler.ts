// (C) 2021-2024 GoodData Corporation
import { SagaIterator } from "redux-saga";
import { call, select, put, all } from "redux-saga/effects";
import { batchActions } from "redux-batched-actions";
import { convertError } from "@gooddata/sdk-ui";
import { DashboardContext } from "../../types/commonTypes.js";
import { PromiseFnReturnType } from "../../types/sagas.js";
import { InitializeAutomations } from "../../commands/scheduledEmail.js";
import {
    selectAutomationId,
    selectEnableAutomations,
    selectEnableInPlatformNotifications,
    selectEnableScheduling,
    selectIsReadOnly,
} from "../../store/config/configSelectors.js";
import { automationsActions } from "../../store/automations/index.js";
import { selectDashboardId } from "../../store/meta/metaSelectors.js";
import { usersActions } from "../../store/users/index.js";
import { notificationChannelsActions } from "../../store/notificationChannels/index.js";
import { loadDashboardUserAutomations, loadWorkspaceAutomationsCount } from "./loadAutomations.js";
import { loadNotificationChannels } from "./loadNotificationChannels.js";
import { loadWorkspaceUsers } from "./loadWorkspaceUsers.js";
import { selectCurrentUser } from "../../store/user/userSelectors.js";
import {
    selectAutomationsIsInitialized,
    selectAutomationsIsLoading,
} from "../../store/automations/automationsSelectors.js";
import { selectCanManageWorkspace } from "../../store/permissions/permissionsSelectors.js";
import {
    filterObjRef,
    IAttributeFilter,
    IDateFilter,
    isDateFilter,
    isRelativeDateFilter,
} from "@gooddata/sdk-model";
import { changeFilterContextSelectionHandler } from "../filterContext/changeFilterContextSelectionHandler.js";
import { changeFilterContextSelection } from "../../commands/filters.js";
import omit from "lodash/omit.js";

export function* initializeAutomationsHandler(
    ctx: DashboardContext,
    _cmd: InitializeAutomations,
): SagaIterator {
    const dashboardId: ReturnType<typeof selectDashboardId> = yield select(selectDashboardId);
    const user: ReturnType<typeof selectCurrentUser> = yield select(selectCurrentUser);
    const canManageAutomations: ReturnType<typeof selectCanManageWorkspace> = yield select(
        selectCanManageWorkspace,
    );
    const enableAutomations: ReturnType<typeof selectEnableScheduling> = yield select(
        selectEnableAutomations,
    );
    const enableInPlatformNotifications: ReturnType<typeof selectEnableInPlatformNotifications> =
        yield select(selectEnableInPlatformNotifications);
    const automationsInitialized: ReturnType<typeof selectAutomationsIsInitialized> = yield select(
        selectAutomationsIsInitialized,
    );
    const automationsIsLoading: ReturnType<typeof selectAutomationsIsLoading> = yield select(
        selectAutomationsIsLoading,
    );
    const isReadOnly: ReturnType<typeof selectIsReadOnly> = yield select(selectIsReadOnly);
    const automationId: ReturnType<typeof selectAutomationId> = yield select(selectAutomationId);

    if (
        !dashboardId ||
        !user ||
        !enableAutomations ||
        automationsInitialized ||
        automationsIsLoading ||
        isReadOnly
    ) {
        return;
    }

    yield put(automationsActions.setAutomationsLoading(true));

    try {
        const [automations, allAutomationsCount, notificationChannels, users]: [
            PromiseFnReturnType<typeof loadDashboardUserAutomations>,
            PromiseFnReturnType<typeof loadWorkspaceAutomationsCount>,
            PromiseFnReturnType<typeof loadNotificationChannels>,
            PromiseFnReturnType<typeof loadWorkspaceUsers>,
        ] = yield all([
            call(loadDashboardUserAutomations, ctx, dashboardId, user.login, !canManageAutomations),
            call(loadWorkspaceAutomationsCount, ctx),
            call(loadNotificationChannels, ctx, enableInPlatformNotifications),
            call(loadWorkspaceUsers, ctx),
        ]);

        // Set filters according to provided automationId
        if (automationId) {
            const targetAutomation = automations.find((a) => a.id === automationId);
            const targetWidget = targetAutomation?.metadata?.widget;
            const targetFilters = targetAutomation?.alert?.execution?.filters;
            const filtersWithObjRef = targetFilters
                ?.filter((f) => {
                    const objRef = filterObjRef(f);
                    return !!objRef;
                })
                .map((f) => {
                    if (isDateFilter(f)) {
                        if (isRelativeDateFilter(f)) {
                            return omit(f, "relativeDateFilter.dataSet");
                        }
                        return omit(f, "absoluteDateFilter.dataSet");
                    }
                    return f;
                }) as (IAttributeFilter | IDateFilter)[];

            if (targetWidget && filtersWithObjRef?.length) {
                const cmd = changeFilterContextSelection(filtersWithObjRef, true, automationId);
                yield call(changeFilterContextSelectionHandler, ctx, cmd);
            }
        }

        yield put(
            batchActions([
                automationsActions.setAutomationsInitialized(),
                automationsActions.setAutomationsLoading(false),
                automationsActions.setUserAutomations(automations),
                automationsActions.setAllAutomationsCount(allAutomationsCount),
                notificationChannelsActions.setNotificationChannels(notificationChannels),
                usersActions.setUsers(users),
            ]),
        );
    } catch (e) {
        yield put(
            batchActions([
                automationsActions.setAutomationsInitialized(),
                automationsActions.setAutomationsLoading(false),
                automationsActions.setAutomationsError(convertError(e)),
            ]),
        );
    }
}
