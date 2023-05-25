// (C) 2019 GoodData Corporation
import { createRequire } from "module";
import base from "../../common/config/jest/jest.config.base.mjs";

const require = createRequire(import.meta.url);

export default {
    ...base,
    moduleNameMapper: {
        ...base.moduleNameMapper,
        "^uuid$": require.resolve("uuid"),
    },
    testEnvironment: "jsdom",
    testRegex: "/tests/(integrated).*\\.test\\.tsx?$",
    setupFiles: ["<rootDir>/integrated-test.setup.js"],
};
