// (C) 2019 GoodData Corporation
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { noop } from "lodash";
import { recordedBackend, RecordedBackendConfig } from "@gooddata/sdk-backend-mockingbird";
import { ReferenceRecordings } from "@gooddata/reference-workspace";
import {
    AccessGranteeDetail,
    IWorkspaceUser,
    IWorkspaceUserGroup,
    ShareStatus,
} from "@gooddata/sdk-backend-spi";
import { IShareDialogProps, ISharedObject, ISharingApplyPayload } from "../types";
import { IUser, uriRef } from "@gooddata/sdk-model";
import { ShareDialog } from "../ShareDialog";
import { groupAll, userAccessGrantee, workspaceUser } from "../ShareDialogBase/test/GranteeMock";
import { getGranteeItemTestId } from "../ShareDialogBase/utils";
import { mapWorkspaceUserToGrantee } from "../shareDialogMappers";

const defaultSharedObject: ISharedObject = {
    ref: uriRef("objRef"),
    shareStatus: "private",
    createdBy: undefined,
};

const defaultProps: IShareDialogProps = {
    backend: recordedBackend(ReferenceRecordings.Recordings),
    workspace: "foo",
    sharedObject: defaultSharedObject,
    currentUserRef: uriRef("userRef"),
    locale: "en-US",
    onApply: noop,
    onCancel: noop,
    onError: noop,
};

const createComponent = async (
    customProps: Partial<IShareDialogProps> = {},
    users: IWorkspaceUser[] = [],
    groups: IWorkspaceUserGroup[] = [],
    grantees: AccessGranteeDetail[] = [],
): Promise<ReactWrapper> => {
    const config: RecordedBackendConfig = {
        userManagement: {
            users: {
                users: users,
            },
            userGroup: {
                userGroups: groups,
            },
            accessControl: {
                accessList: grantees,
            },
        },
    };

    const backend = recordedBackend(ReferenceRecordings.Recordings, config);

    const props: IShareDialogProps = { ...defaultProps, ...customProps, backend };

    const wrapper = mount(<ShareDialog {...props} />);

    await waitForComponentToPaint(wrapper);

    return wrapper;
};

function isDialogVisible(wrapper: ReactWrapper) {
    return wrapper.find(".s-gd-share-dialog").hostNodes().length === 1;
}

const waitForComponentToPaint = async (wrapper: ReactWrapper) => {
    // this prevent  Warning: An update to null inside a test was not wrapped in act(...)
    // https://github.com/enzymejs/enzyme/issues/2073
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve));
        wrapper.update();
    });
};

function isGroupAllVisible(wrapper: ReactWrapper) {
    const className = getGranteeItemTestId(groupAll);
    return wrapper.find(`.${className}`).hostNodes().length === 1;
}

function isOwnerVisible(wrapper: ReactWrapper, isActive: boolean) {
    const selector = isActive ? ".s-share-dialog-owner" : ".s-share-dialog-inactive-owner";
    return wrapper.find(selector).hostNodes().length === 1;
}

function isCurrentUserInGrantees(wrapper: ReactWrapper) {
    return wrapper.find(".s-share-dialog-current-user").hostNodes().length === 1;
}

function getGranteeSelector(user: IWorkspaceUser): string {
    const grantee = mapWorkspaceUserToGrantee(user, uriRef(""));
    return `.${getGranteeItemTestId(grantee)}`;
}

function getGroupAllSelector(): string {
    return `.${getGranteeItemTestId(groupAll)}`;
}

function clickDeleteGranteeIcon(wrapper: ReactWrapper, selector: string) {
    const item = wrapper.find(selector);
    item.simulate("mouseover"); // delete icon is visible just when mouse is over item
    item.find(".s-gd-grantee-item-delete").hostNodes().simulate("click");
    wrapper.update();
}

function isGranteeVisible(wrapper: ReactWrapper, selector: string) {
    return wrapper.find(selector).hostNodes().length === 1;
}

function shareDialogSubmit(wrapper: ReactWrapper) {
    return wrapper.find(".s-dialog-submit-button").hostNodes().simulate("click");
}

function shareDialogCancel(wrapper: ReactWrapper) {
    return wrapper.find(".s-dialog-cancel-button").hostNodes().simulate("click");
}

function clickAddGrantees(wrapper: ReactWrapper) {
    wrapper.find(".s-add-users-or-groups").hostNodes().simulate("click");
    wrapper.update();
}

function clickBack(wrapper: ReactWrapper) {
    wrapper.find(".s-share-dialog-navigate-back").hostNodes().simulate("click");
    wrapper.update();
}

function getGroupAllOptionSelector(): string {
    return `.${getGranteeItemTestId(groupAll, "option")}`;
}

function getUserOptionSelector(user: IWorkspaceUser): string {
    return `.${getGranteeItemTestId(mapWorkspaceUserToGrantee(user, uriRef("")), "option")}`;
}

function clickOnOption(wrapper: ReactWrapper, selector: string) {
    wrapper.find(selector).simulate("click");
}

function isSelectionEmpty(wrapper: ReactWrapper) {
    return wrapper.find(".s-gd-share-dialog-grantee-list-empty-selection").hostNodes().length === 1;
}

function isDialogOnShareGranteesPage(wrapper: ReactWrapper) {
    return wrapper.find(".s-gd-share-grantees").hostNodes().length === 1;
}

describe("ShareDialog", () => {
    describe("Share with users and groups page", () => {
        it("should render without crash", async () => {
            const wrapper = await createComponent();
            expect(isDialogVisible(wrapper)).toBe(true);
        });

        it.each([
            ["add group all", "public", true],
            ["add not group all", "private", false],
            ["add not group all", "shared", false],
        ])(
            "should %s when status of sharedObject is%s",
            async (_desc: string, status: ShareStatus, visible: boolean) => {
                const sharedObject: ISharedObject = { ...defaultSharedObject, shareStatus: status };
                const wrapper = await createComponent({ sharedObject });
                expect(isGroupAllVisible(wrapper)).toBe(visible);
            },
        );

        it.each([
            ["inactive owner", "is not specified", undefined],
            ["active owner", "is specified", workspaceUser],
        ])("should render %s when createdBy user %s", async (_desc: string, _desc2: string, user: IUser) => {
            const sharedObject: ISharedObject = { ...defaultSharedObject, createdBy: user };
            const wrapper = await createComponent({ sharedObject });
            const isUserActive = user !== undefined;

            expect(isOwnerVisible(wrapper, isUserActive)).toBe(true);
        });

        it("should mark current user in grantees ", async () => {
            const userRef = userAccessGrantee.user.ref;
            const wrapper = await createComponent({ currentUserRef: userRef }, [], [], [userAccessGrantee]);
            expect(isCurrentUserInGrantees(wrapper)).toBe(true);
        });

        it("should mark current in grantees when is owner", async () => {
            const sharedObject: ISharedObject = { ...defaultSharedObject, createdBy: workspaceUser };
            const wrapper = await createComponent({ sharedObject, currentUserRef: workspaceUser.ref });
            expect(isCurrentUserInGrantees(wrapper)).toBe(true);
        });

        it("should remove grantee from list and submit callback for empty grantees list status is private and isUnderStrictControl is true", async () => {
            const granteeSelector = getGranteeSelector(userAccessGrantee.user);
            const onApply = jest.fn();
            const expectedPayload: ISharingApplyPayload = {
                granteesToAdd: [],
                granteesToDelete: [
                    {
                        granteeRef: userAccessGrantee.user.ref,
                    },
                ],
                isUnderStrictControl: true,
                shareStatus: "private",
            };

            const wrapper = await createComponent({ onApply: onApply }, [], [], [userAccessGrantee]);
            clickDeleteGranteeIcon(wrapper, granteeSelector);

            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(false);

            shareDialogSubmit(wrapper);

            expect(onApply).toHaveBeenCalledTimes(1);
            expect(onApply).toHaveBeenLastCalledWith(expectedPayload);
        });

        it("should remove grantee from list and submit callback for non empty grantees list status is shared and isUnderStrictControl is true", async () => {
            const granteeSelector = getGranteeSelector(userAccessGrantee.user);
            const onApply = jest.fn();
            const expectedPayload: ISharingApplyPayload = {
                granteesToAdd: [],
                granteesToDelete: [
                    {
                        granteeRef: userAccessGrantee.user.ref,
                    },
                ],
                isUnderStrictControl: true,
                shareStatus: "shared",
            };

            const secondGranteeRef = uriRef("second");
            const secondAccessGrantee = {
                ...userAccessGrantee,
                user: { ...userAccessGrantee.user, ref: secondGranteeRef },
            };
            const wrapper = await createComponent(
                { onApply: onApply },
                [],
                [],
                [userAccessGrantee, secondAccessGrantee],
            );
            clickDeleteGranteeIcon(wrapper, granteeSelector);

            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(false);

            shareDialogSubmit(wrapper);

            expect(onApply).toHaveBeenCalledTimes(1);
            expect(onApply).toHaveBeenLastCalledWith(expectedPayload);
        });

        it("should remove grantee from list and submit callback when group all present is public and isUnderStrictControl is false", async () => {
            const granteeSelector = getGranteeSelector(userAccessGrantee.user);
            const onApply = jest.fn();
            const expectedPayload: ISharingApplyPayload = {
                granteesToAdd: [],
                granteesToDelete: [
                    {
                        granteeRef: userAccessGrantee.user.ref,
                    },
                ],
                isUnderStrictControl: false,
                shareStatus: "public",
            };
            const sharedObject: ISharedObject = { ...defaultSharedObject, shareStatus: "public" };
            const wrapper = await createComponent(
                { onApply: onApply, sharedObject },
                [],
                [],
                [userAccessGrantee],
            );
            clickDeleteGranteeIcon(wrapper, granteeSelector);

            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(false);

            shareDialogSubmit(wrapper);

            expect(onApply).toHaveBeenCalledTimes(1);
            expect(onApply).toHaveBeenLastCalledWith(expectedPayload);
        });

        it("should remove group all from list and submit callback is private and isUnderStrictControl is true", async () => {
            const granteeSelector = getGroupAllSelector();
            const onApply = jest.fn();
            const expectedPayload: ISharingApplyPayload = {
                granteesToAdd: [],
                granteesToDelete: [],
                isUnderStrictControl: true,
                shareStatus: "private",
            };
            const sharedObject: ISharedObject = { ...defaultSharedObject, shareStatus: "public" };
            const wrapper = await createComponent({ onApply: onApply, sharedObject }, [], [], []);
            clickDeleteGranteeIcon(wrapper, granteeSelector);

            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(false);

            shareDialogSubmit(wrapper);

            expect(onApply).toHaveBeenCalledTimes(1);
            expect(onApply).toHaveBeenLastCalledWith(expectedPayload);
        });

        it("should call cancel callback when cancel is clicked", async () => {
            const onCancel = jest.fn();
            const wrapper = await createComponent({ onCancel: onCancel }, [], [], []);
            await waitForComponentToPaint(wrapper);
            shareDialogCancel(wrapper);
            expect(onCancel).toHaveBeenCalledTimes(1);
        });
    });

    describe("Add users and groups page", () => {
        it("should add group all into grantees selection", async () => {
            const wrapper = await createComponent({}, [], [], [userAccessGrantee]);
            clickAddGrantees(wrapper);
            await waitForComponentToPaint(wrapper);
            clickOnOption(wrapper, getGroupAllOptionSelector());
            expect(isGroupAllVisible(wrapper)).toBe(true);
        });

        it("should add user into grantees selection", async () => {
            const wrapper = await createComponent({}, [workspaceUser], [], []);

            clickAddGrantees(wrapper);
            await waitForComponentToPaint(wrapper);
            clickOnOption(wrapper, getUserOptionSelector(workspaceUser));

            expect(isGranteeVisible(wrapper, getGranteeSelector(workspaceUser))).toBe(true);
        });

        it("should add user into grantees selection and remove", async () => {
            const wrapper = await createComponent({}, [workspaceUser], [], []);
            const granteeSelector = getGranteeSelector(workspaceUser);

            clickAddGrantees(wrapper);
            await waitForComponentToPaint(wrapper);
            clickOnOption(wrapper, getUserOptionSelector(workspaceUser));
            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(true);

            clickDeleteGranteeIcon(wrapper, granteeSelector);
            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(false);
        });

        it("should clear selection when click back", async () => {
            const wrapper = await createComponent({}, [workspaceUser], [], []);
            const granteeSelector = getGranteeSelector(workspaceUser);

            clickAddGrantees(wrapper);
            await waitForComponentToPaint(wrapper);
            clickOnOption(wrapper, getUserOptionSelector(workspaceUser));
            expect(isGranteeVisible(wrapper, granteeSelector)).toBe(true);

            clickBack(wrapper);
            clickAddGrantees(wrapper);
            await waitForComponentToPaint(wrapper);

            expect(isSelectionEmpty(wrapper)).toBe(true);
        });

        it("should go back when cancel is clicked", async () => {
            const wrapper = await createComponent({}, [], [], []);

            clickAddGrantees(wrapper);
            await waitForComponentToPaint(wrapper);
            shareDialogCancel(wrapper);
            expect(isDialogOnShareGranteesPage(wrapper)).toBe(true);
        });
    });
});
