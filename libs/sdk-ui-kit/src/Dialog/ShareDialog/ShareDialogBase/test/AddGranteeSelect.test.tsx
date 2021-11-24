// (C) 2019 GoodData Corporation
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { AddGranteeSelect } from "../AddGranteeSelect";
import { IAddGranteeSelectProps } from "../types";
import { noop } from "lodash";
import { BackendProvider, withIntl, WorkspaceProvider } from "@gooddata/sdk-ui";
import { recordedBackend, RecordedBackendConfig } from "@gooddata/sdk-backend-mockingbird";
import { ReferenceRecordings } from "@gooddata/reference-workspace";
import { AccessGranteeDetail, IWorkspaceUser } from "@gooddata/sdk-backend-spi";

const defaultProps: IAddGranteeSelectProps = {
    onSelectGrantee: noop,
    appliedGrantees: [],
};

const createComponent = (
    customProps: Partial<IAddGranteeSelectProps> = {},
    accessList: AccessGranteeDetail[] = [],
    users: IWorkspaceUser[] = [],
): ReactWrapper => {
    const props: IAddGranteeSelectProps = { ...defaultProps, ...customProps };
    const config: RecordedBackendConfig = {
        accessControl: {
            accessList,
        },
        users: {
            users: users,
        },
    };

    const backend = recordedBackend(ReferenceRecordings.Recordings, config);
    const Wrapped = withIntl(AddGranteeSelect);

    return mount(
        <BackendProvider backend={backend}>
            <WorkspaceProvider workspace={"foo"}>
                <Wrapped {...props} />
            </WorkspaceProvider>
        </BackendProvider>,
    );
};

function getDatePickerCalendar(wrapper: ReactWrapper) {
    return wrapper.find(".gd-datepicker-picker");
}

describe("AddGranteeSelect", () => {
    it("should render without crash", () => {
        createComponent();
    });

    it("it should render all group item as a select option when is not specified in appliedGrantees", () => {
        const wrapper = createComponent();
    });
});
