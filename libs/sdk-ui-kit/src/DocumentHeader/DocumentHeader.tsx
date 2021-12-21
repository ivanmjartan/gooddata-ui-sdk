// (C) 2007-2021 GoodData Corporation
import React from "react";
import { Helmet } from "react-helmet";
import compact from "lodash/compact";

/**
 * @internal
 */
export interface IDocumentHeaderProps {
    pageTitle?: string;
    brandTitle?: string;
    appleTouchIconUrl?: string;
    faviconUrl?: string;
}

function getEffectiveTitle(pageTitle: string, brandTitle: string): string {
    return compact([pageTitle, brandTitle]).join(" - ");
}

const DEFAULT_FAVICON_URL = "/images/favicon.ico";
const APPLE_TOUCH_ICON = "/images/appleTouchIcon.png";

const getCacheInvariantUrl = (sourceUrl: string, defaultUrl: string) => {
    if (sourceUrl && sourceUrl.toLocaleLowerCase() === defaultUrl.toLocaleLowerCase()) {
        // prevent cache of default ico image
        return `${sourceUrl}?2021`;
    }

    return sourceUrl;
};

const getFaviconUrl = (faviconUrl: string) => {
    return getCacheInvariantUrl(faviconUrl, DEFAULT_FAVICON_URL);
};

const getAppleTouchIcon = (appleTouchIco: string) => {
    return getCacheInvariantUrl(appleTouchIco, APPLE_TOUCH_ICON);
};

/**
 * @internal
 */
const DocumentHeader: React.FC<IDocumentHeaderProps> = (props) => {
    const { pageTitle = "", brandTitle = "", appleTouchIconUrl = "", faviconUrl = "" } = props;

    return (
        <Helmet>
            <title>{getEffectiveTitle(pageTitle, brandTitle)}</title>
            <link rel="apple-touch-icon" type="image/png" href={getAppleTouchIcon(appleTouchIconUrl)} />
            <link rel="shortcut icon" type="image/x-icon" href={getFaviconUrl(faviconUrl)} />
        </Helmet>
    );
};

export default DocumentHeader;
