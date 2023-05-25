// (C) 2023 GoodData Corporation
import { vi } from "vitest";

vi.mock(
    "@gooddata/api-client-bear",
    async () => await vi.importActual("./__mocks__/@gooddata/api-client-bear.ts"),
);
