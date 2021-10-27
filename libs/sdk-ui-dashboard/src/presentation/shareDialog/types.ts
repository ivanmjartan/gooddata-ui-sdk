// (C) 2019-2021 GoodData Corporation
import { ComponentType } from "react";

/**
 * @alpha
 */
export interface IShareDialogProps {
    /**
     * Is scheduled e-mail dialog visible?
     */
    isVisible?: boolean;
}

///
/// Custom component types
///

/**
 * @alpha
 */
export type CustomShareDialogComponent = ComponentType;
