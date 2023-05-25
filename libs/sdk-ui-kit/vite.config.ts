// (C) 2023 GoodData Corporation
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom", // happy-dom is insufficient for some of the tests
        setupFiles: "./setupTests.ts",
    },
});
