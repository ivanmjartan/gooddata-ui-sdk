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
} from "./types";

export { isGranteeUser, isGranteeGroup } from "./types";

export { ShareDialogBase } from "./ShareDialog";

export { ShareGranteeBase } from "./ShareGranteeBase";

export { AddGranteeBase } from "./AddGranteeBase";

export { GranteeItemComponent } from "./GranteeItem";
