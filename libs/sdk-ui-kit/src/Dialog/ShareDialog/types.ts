// (C) 2021 GoodData Corporation
import isEmpty from "lodash/isEmpty";

// Grantee types

/**
 * @internal
 */
export type GranteeItem = IGranteeUser | IGranteeGroup | IGranteeGroupAll;

/**
 * @internal
 */
export type GranteeType = "user" | "group" | "groupAll";

/**
 * @internal
 */
export interface IGranteeBase {
    granteeType: GranteeType;
    id: string;
}

/**
 * @internal
 */
export interface IGranteeUser extends IGranteeBase {
    granteeType: "user";
    granteeName: string;
    granteeEmail: string;
    isOwner: boolean;
    isCurrentUser: boolean;
}

/**
 * @internal
 */
export const isGranteeUser = (obj: unknown): obj is IGranteeUser => {
    return !isEmpty(obj) && (obj as IGranteeUser).granteeType === "user";
};

/**
 * @internal
 */
export interface IGranteeGroup extends IGranteeBase {
    granteeType: "group";
    groupName: string;
    granteeCount: number;
}
/**
 * @internal
 */
export const isGranteeGroup = (obj: unknown): obj is IGranteeGroup => {
    return !isEmpty(obj) && (obj as IGranteeGroup).granteeType === "group";
};

/**
 * @internal
 */
export interface IGranteeGroupAll extends IGranteeBase {
    granteeType: "groupAll";
    granteeCount: number;
}

/**
 * @internal
 */
export const isGranteeGroupAll = (obj: unknown): obj is IGranteeGroup => {
    return !isEmpty(obj) && (obj as IGranteeGroupAll).granteeType === "groupAll";
};

// Components types

/**
 * @internal
 */
export type DialogModeType = "ShareGrantee" | "AddGrantee";

/**
 * @internal
 */
export interface IShareDialogProps {
    owner: IGranteeUser;
    grantees: GranteeItem[];
    onCancel?: () => void;
    onSubmit?: (granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => void;
}

/**
 * @internal
 */
export interface IGranteeItemProps {
    mode: DialogModeType;
    grantee: GranteeItem;
    onDelete: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export interface IShareGranteeBaseProps {
    isDirty: boolean;
    owner: IGranteeUser;
    grantees: GranteeItem[];
    onAddGranteeButtonClick: () => void;
    onGranteeDelete: (grantee: GranteeItem) => void;
    onCancel: () => void;
    onSubmit: () => void;
}

/**
 * @internal
 */
export interface IShareGranteeContentProps {
    grantees: GranteeItem[];
    onAddGrantee: () => void;
    onDelete: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export interface IAddGranteeBaseProps {
    isDirty: boolean;
    availableGrantees: GranteeItem[];
    addedGrantees: GranteeItem[];
    onBackClick?: () => void;
    onDelete: (grantee: GranteeItem) => void;
    onAddUserOrGroups?: (grantee: GranteeItem) => void; // rename
    onCancel: () => void;
    onSubmit: () => void;
}

/**
 * @internal
 */
export interface IAddGranteeContentProps {
    availableGrantees: GranteeItem[];
    addedGrantees: GranteeItem[];
    onDelete: (grantee: GranteeItem) => void;
    onAddUserOrGroups: (grantee: GranteeItem) => void;
}

/**
 * @internal
 */
export interface IGranteesListProps {
    mode: DialogModeType;
    grantees: GranteeItem[];
    onDelete: (grantee: GranteeItem) => void;
}
