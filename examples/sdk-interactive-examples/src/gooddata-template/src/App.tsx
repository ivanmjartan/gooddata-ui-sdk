// (C) 2019-2023 GoodData Corporation
import React from "react";
import { BackendProvider, WorkspaceProvider } from "@gooddata/sdk-ui";
import { backend } from "./backend.js";

// Workspace ID is injected by WebPack based on the value in package.json
const workspaceId = WORKSPACE_ID;

export const App: React.FC = () => {
    return (
        <BackendProvider backend={backend}>
            <WorkspaceProvider workspace={workspaceId}>
                <div className="app">
                    here is place for your example
                </div>
            </WorkspaceProvider>
        </BackendProvider>
    );
};