// (C) 2021 GoodData Corporation
import { GranteeType } from "./types";

const exhaustiveCheck = (_param: never): never => {
    throw new Error("unknown grantee type");
};

const getGranteeLabel = (grantee: GranteeType): string => {
    if (grantee.granteeType === "user") {
        return grantee.granteeName;
    } else if (grantee.granteeType === "group") {
        return grantee.groupName;
    } else {
        exhaustiveCheck(grantee);
    }
};

export const sortGranteesByName = (granteeA: GranteeType, granteeB: GranteeType): number => {
    const textA = getGranteeLabel(granteeA).toUpperCase();
    const textB = getGranteeLabel(granteeB).toUpperCase();

    return textA < textB ? -1 : textA > textB ? 1 : 0;
};

export const getGranteeId = (grantee: GranteeType): string => {
    if (grantee.granteeType === "user") {
        return grantee.id;
    } else if (grantee.granteeType === "group") {
        return grantee.id;
    } else {
        exhaustiveCheck(grantee);
    }
};
