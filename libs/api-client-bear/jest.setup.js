// (C) 2018-2023 GoodData Corporation

import blob from "blob-polyfill";
import { jest } from "@jest/globals";

global.Blob = blob.Blob;
global.jest = jest;

// Fail test on console error (react proptypes validation etc.)
const consoleError = console.error;
console.error = (err, ...args) => {
    consoleError(err, ...args);
    throw new Error(err);
};
