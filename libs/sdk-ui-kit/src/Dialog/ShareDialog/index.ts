// (C) 2021 GoodData Corporation

export type {
    GranteeType,
    IGranteeUser,
    IGranteeGroup,
    IShareDialogProps,
    IGranteeItemProps,
    IShareGranteeBaseProps,
    IShareGranteeContentProps,
    IAddGranteeBaseProps,
} from "./types";

export { isGranteeUser, isGranteeGroup } from "./types";

export { ShareDialog } from "./ShareDialog";

export { ShareGranteeBase } from "./ShareGranteeBase";

export { AddGranteeBase } from "./AddGranteeBase";

export { GranteeItem } from "./GranteeItem";
