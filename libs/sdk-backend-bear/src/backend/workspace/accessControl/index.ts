// (C) 2021 GoodData Corporation
import {
    IWorkspaceAccessControlService,
    AccessGranteeDetail,
    IAccessGrantee,
} from "@gooddata/sdk-backend-spi";
import { objRefToUri } from "../../../utils/api";
import { BearAuthenticatedCallGuard } from "../../../types/auth";
import { ObjRef } from "@gooddata/sdk-model";
import { GdcAccessControl } from "@gooddata/api-model-bear";
import { convertWorkspaceUserGroup } from "../../../convertors/fromBackend/UserGroupsConverter";
import { convertUsersItem } from "../../../convertors/fromBackend/UsersConverter";
import isGranteeUserInfo = GdcAccessControl.isGranteeUserInfo;

// TODO INE move to fromBackend convertors
const convertGranteeItem = (item: GdcAccessControl.IGranteeEntry): AccessGranteeDetail => {
    if (isGranteeUserInfo(item.aclEntry.grantee)) {
        return {
            type: "user",
            user: convertUsersItem(item.aclEntry.grantee.user),
        };
    } else {
        return {
            type: "group",
            userGroup: convertWorkspaceUserGroup(item.aclEntry.grantee.userGroup),
        };
    }
};

export class BearWorkspaceAccessControlService implements IWorkspaceAccessControlService {
    constructor(private readonly authCall: BearAuthenticatedCallGuard, private readonly workspace: string) {}

    public async getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]> {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteesList = await this.authCall((sdk) => sdk.project.getGranteesInfo(objectUri, {}));
        const {
            grantees: { items },
        } = granteesList;
        return items.map(convertGranteeItem);
    }

    public async grantAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void> {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteeUris = await Promise.all(
            grantees.map((grantee) => objRefToUri(grantee.granteeRef, this.workspace, this.authCall)),
        );
        return this.authCall((sdk) => sdk.project.addGrantees(objectUri, granteeUris));
    }

    public async revokeAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void> {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteeUris = await Promise.all(
            grantees.map((grantee) => objRefToUri(grantee.granteeRef, this.workspace, this.authCall)),
        );
        return this.authCall((sdk) => sdk.project.removeGrantees(objectUri, granteeUris));
    }
}
