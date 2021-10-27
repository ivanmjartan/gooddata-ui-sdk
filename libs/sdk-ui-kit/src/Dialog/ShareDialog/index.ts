// (C) 2021 GoodData Corporation

export type {
    GranteeType,
    GranteeItem,
    IGranteeBase,
    IGranteeUser,
    IGranteeGroup,
    IGranteeGroupAll,
    IShareDialogBaseProps as IShareDialogProps,
    IGranteeItemProps,
    IShareGranteeBaseProps,
    IShareGranteeContentProps,
    IAddGranteeBaseProps,
    DialogModeType,
} from "./ShareDialogBase/types";

export { isGranteeUser, isGranteeGroup } from "./ShareDialogBase/types";

export { ShareDialogBase } from "./ShareDialogBase/ShareDialogBase";

export { ShareGranteeBase } from "./ShareDialogBase/ShareGranteeBase";

export { AddGranteeBase } from "./ShareDialogBase/AddGranteeBase";

export { GranteeItemComponent } from "./ShareDialogBase/GranteeItem";
