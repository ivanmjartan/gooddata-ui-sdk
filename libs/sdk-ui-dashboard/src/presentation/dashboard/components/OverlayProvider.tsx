// (C) 2022 GoodData Corporation
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OverlayController, OverlayControllerProvider } from "@gooddata/sdk-ui-kit";
import { v4 as uuid } from "uuid";
import { useDragDropManager } from "react-dnd";
import throttle from "lodash/throttle";

/**
 * This is custom dom goodstrap event, it is used by Overlay to handle CloseOnParentScroll
 */
const fireGoodstrapScrollEvent = (
    node: HTMLElement,
    windowInstance = { dispatchEvent: (_event: Event) => true },
) => {
    windowInstance.dispatchEvent(
        new CustomEvent("goodstrap.scrolled", {
            // this will close dropdowns with closeOnParentScroll=true
            bubbles: true,
            detail: {
                node,
            },
        }),
    );
};

/**
 * This is custom dom goodstrap event, it is used by Overlay to handle CloseOnParentDrag
 */
const fireGoodstrapDragEvent = (
    node: HTMLElement,
    windowInstance = { dispatchEvent: (_event: Event) => true },
) => {
    windowInstance.dispatchEvent(
        new CustomEvent("goodstrap.drag", {
            // this will close dropdowns with closeOnMouseDrag=true
            bubbles: true,
            detail: {
                node,
            },
        }),
    );
};

/**
 * This is Overlay wrapper it render dom structure for rendering portals and overlays.
 * It also renders OverlayControllerProvider to handle z-indexes and define elements where portals should be rendered.
 *
 * @internal
 */
export const OverlayProvider: React.FC = (props) => {
    const { children } = props;
    const elementRef = useRef<HTMLDivElement>(null);
    // we need unique id for each component
    const [generatedId] = useState(uuid());

    const onStartDnd = useCallback(() => {
        if (elementRef.current) {
            fireGoodstrapDragEvent(elementRef.current, window);
        }
    }, []);

    useDndNotification({ onStartDnd });

    const onScroll = useMemo(
        () =>
            throttle(() => {
                if (elementRef.current) {
                    fireGoodstrapScrollEvent(elementRef.current, window);
                }
            }, 500),
        [],
    );

    const overlaysRootId = `overlays-root-${generatedId}`;
    const portalsRootId = `portals-root-${generatedId}`;

    return (
        <OverlayControllerProvider
            overlayController={OverlayController.getInstance()}
            overlaysRootId={overlaysRootId}
            portalsRootId={portalsRootId}
        >
            {/* 
                This is the main dashboard wrapper element.
                It represents the dashboard and its scroll content.
                It captures onScroll event and fires custom goodstrap event to close all open overlays that has CloseOnParentScroll props set to true
            */}

            <div
                ref={elementRef}
                onScroll={onScroll}
                style={{
                    overflow: "auto",
                    maxWidth: "100vw", //Set this max size value is essential otherwise scroll happened on parent element (Body) and onScroll event is not fired.
                    maxHeight: "100vh", //Set this max size value is essential otherwise scroll happened on parent element (Body) and onScroll event is not fired.
                    width: "100%",
                    height: "100%",
                }}
            >
                {/* 
                    This element represents the first element with relative position and is part of the scroll area. 
                    Position relative is essential for portals because portal position (absolute) is calculated from this element. 
                    Result of this that overlays are moving as scroll content.   
                */}
                <div id={overlaysRootId} style={{ position: "relative" }}>
                    {children}
                    {/* This element is wrapper for all portals rendered by overlays. */}
                    <div id={portalsRootId} />
                </div>
            </div>
        </OverlayControllerProvider>
    );
};

interface IUseDndNotificationProps {
    onStartDnd: () => void;
}

const useDndNotification = (props: IUseDndNotificationProps) => {
    const { onStartDnd } = props;

    const lastDndId = useRef<string | symbol | null>(null);

    const manager = useDragDropManager();

    useEffect(() => {
        const unsubscribe = manager.getMonitor().subscribeToStateChange(() => {
            // we need current dnd object id
            const dndId = manager.getMonitor().getSourceId();

            //we need just start dnd operation and we determine it that id is different than last id and is not null
            if (dndId !== lastDndId.current) {
                // store last id, dnd operation ends when id is null
                lastDndId.current = dndId;

                // fire event just once when id not null
                if (dndId) {
                    onStartDnd();
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [onStartDnd, manager]);
};
