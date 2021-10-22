// (C) 2021 GoodData Corporation
import isEmpty from "lodash/isEmpty";

// Grantee types

/**
 * @internal
 */
export type GranteeType = IGranteeUser | IGranteeGroup;

/**
 * @internal
 */
export interface IGranteeUser {
    granteeType: "user";
    id: string;
    granteeName: string;
    granteeEmail: string;
    isOwner: boolean;
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
export interface IGranteeGroup {
    granteeType: "group";
    id: string;
    groupName: string;
    granteeCount: number;
}

/**
 * @internal
 */
export const isGranteeGroup = (obj: unknown): obj is IGranteeGroup => {
    return !isEmpty(obj) && (obj as IGranteeGroup).granteeType === "group";
};

// Components types

/**
 * @internal
 */
export interface IShareDialogProps {
    owner: IGranteeUser;
    grantees: GranteeType[];
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
export interface IGranteeItemProps {
    grantee: GranteeType;
    onDelete: (grantee: GranteeType) => void;
}

/**
 * @internal
 */
export interface IShareGranteeBaseProps {
    owner: IGranteeUser;
    grantees: GranteeType[];
    onAddGrantee?: () => void;
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}

/**
 * @internal
 */
export interface IShareGranteeContentProps {
    grantees: GranteeType[];
    onAddGrantee: () => void;
    onDelete: (grantee: GranteeType) => void;
}

/**
 * @internal
 */
export interface IAddGranteeBaseProps {
    onBackClick?: () => void;
    onAddUserOrGroups?: () => void;
    onCancel?: () => void;
    onSubmit?: (data?: any) => void; // Add typings of data
}
