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

const convertGranteeItem = (item: GdcAccessControl.IGranteeEntry): AccessGranteeDetail => {
    if (isGranteeUserInfo(item.grantee)) {
        return {
            user: convertUsersItem(item.grantee.user),
        };
    } else {
        return {
            userGroup: convertWorkspaceUserGroup(item.grantee.userGroup),
        };
    }
};

export class BearWorkspaceAccessControlQuery implements IWorkspaceAccessControlService {
    constructor(private readonly authCall: BearAuthenticatedCallGuard, private readonly workspace: string) {}

    public async getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]> {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteesList = await this.authCall((sdk) => sdk.project.getGranteesInfo(objectUri, {}));
        const {
            grantees: { items },
        } = granteesList;
        return items.map(convertGranteeItem);
    }

    public grantAccess(_sharedObject: ObjRef, _grantees: IAccessGrantee[]): Promise<void> {
        return new Promise((resolve) => resolve());
    }

    public revokeAccess(_sharedObject: ObjRef, _grantess: IAccessGrantee[]): Promise<void> {
        return new Promise((resolve) => resolve());
    }
}
