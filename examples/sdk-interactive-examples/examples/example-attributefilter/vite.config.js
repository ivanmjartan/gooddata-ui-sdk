// (C) 2007-2022 GoodData Corporation
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import packageJson from './package.json';

const backendUrl = packageJson.gooddata.hostname;
const workspaceId = packageJson.gooddata.workspaceId;

const workspaceRoot = "/Users/ivan.mjartan/repositories/gooddata/gooddata-ui-sdk/";

console.log("pwd",searchForWorkspaceRoot(process.cwd()));
console.log("backendUrl: ", backendUrl);

export default defineConfig({
    entry: "src/index.tsx",

    plugins: [
        react({ jsxRuntime: "classic" }),
        createHtmlPlugin({
            entry: "/src/index.tsx",
            template: "./src/public/index.html",
        }),
    ],
    define: {
        WORKSPACE_ID: JSON.stringify(workspaceId),
    },
    resolve: {
        alias: {
        "~@gooddata": "@gooddata",     
        },
    },
    server: {
        port: 3000,
        fs: {
            allow: [workspaceRoot]
        },
        proxy: {
            "/api": {
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                secure: false,
                target: backendUrl,
                headers: {
                    host: backendUrl,
                    origin: null,
                },
                configure: (proxy) => {
                    proxy.on("proxyReq", (proxyReq) => {
                        // changeOrigin: true does not work well for POST requests, so remove origin like this to be safe
                        proxyReq.removeHeader("origin");
                        proxyReq.setHeader("accept-encoding", "identity");
                    });
                },
            },
        },
    },
});
