// (C) 2021 GoodData Corporation
import { IntlShape } from "react-intl";
import { areObjRefsEqual, uriRef } from "@gooddata/sdk-model";
import { GranteeItem, IGranteeGroupAll } from "./types";

export const GROUP_ALL_ID = "groupAll";

export const GranteeGroupAll: IGranteeGroupAll = {
    id: uriRef(GROUP_ALL_ID),
    granteeType: "groupAll",
};

const exhaustiveCheck = (_param: never): never => {
    throw new Error("unknown grantee type");
};

export const getGranteeLabel = (grantee: GranteeItem, intl: IntlShape): string => {
    if (grantee.granteeType === "user") {
        return grantee.granteeName;
    } else if (grantee.granteeType === "group") {
        return grantee.groupName;
    } else if (grantee.granteeType === "groupAll") {
        return intl.formatMessage({ id: "shareDialog.share.grantee.item.user.all" });
    } else {
        exhaustiveCheck(grantee);
    }
};

export const sortGranteesByName =
    (intl: IntlShape) =>
    (granteeA: GranteeItem, granteeB: GranteeItem): number => {
        const textA = getGranteeLabel(granteeA, intl).toUpperCase();
        const textB = getGranteeLabel(granteeB, intl).toUpperCase();

        return textA < textB ? -1 : textA > textB ? 1 : 0;
    };

export const filterNotInArray = (array: GranteeItem[], notInArray: GranteeItem[]): GranteeItem[] => {
    return array.filter((grantee: GranteeItem) => {
        return !notInArray.some((g) => areObjRefsEqual(g.id, grantee.id));
    });
};
