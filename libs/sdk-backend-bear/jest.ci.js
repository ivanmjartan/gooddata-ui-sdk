// (C) 2019 GoodData Corporation
import { createRequire } from "module";
import base from "../../common/config/jest/jest.config.ci.base.mjs";

const require = createRequire(import.meta.url);

export default {
    ...base,
    moduleNameMapper: {
        ...base.moduleNameMapper,
        "^uuid$": require.resolve("uuid"),
    },
    testEnvironment: "jsdom",
    testRegex: "(/src).*\\.test\\.tsx?$",
};
