// (C) 2024 GoodData Corporation
import * as React from "react";
import { Input, LoadingMask, useDebouncedState } from "@gooddata/sdk-ui-kit";
import { useSemanticSearch } from "../hooks/index.js";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { GenAISemanticSearchType, ISemanticSearchResultItemWithUrl } from "@gooddata/sdk-model";
import { SearchResultsList } from "./SearchResultsList.js";
import { FormattedMessage, WrappedComponentProps } from "react-intl";

/**
 * A time in milliseconds to wait before sending a search request after the user stops typing.
 */
const DEBOUNCE = 300;
/**
 * A height of the loading mask.
 */
const LOADING_HEIGHT = 100;
/**
 * A width of the search drop-down.
 */
const SEARCH_OVERLAY_WIDTH = 440;

/**
 * Props for the SemanticSearchOverlay component.
 * @internal
 */
export type SearchOverlayProps = WrappedComponentProps & {
    /**
     * A function called when the user selects an item from the search results.
     */
    onSelect: (item: ISemanticSearchResultItemWithUrl) => void;
    /**
     * An analytical backend to use for the search. Can be omitted and taken from context.
     */
    backend?: IAnalyticalBackend;
    /**
     * A workspace to search in. Can be omitted and taken from context.
     */
    workspace?: string;
    /**
     * A list of object types to search for.
     */
    objectTypes?: GenAISemanticSearchType[];
    /**
     * A flag to enable deep search, i.e. search dashboard by their contents.
     */
    deepSearch?: boolean;
    /**
     * A limit of search results to return.
     */
    limit?: number;
};

/**
 * A component that allows users to search for insights, metrics, attributes, and other objects using semantic search.
 * The internal version is meant to be used in an overlay inside the Header.
 * @internal
 */
export const SearchOverlay: React.FC<SearchOverlayProps> = ({
    onSelect,
    backend,
    workspace,
    objectTypes,
    deepSearch,
    limit = 6,
    intl,
}) => {
    // Input value handling
    const [value, setValue, searchTerm] = useDebouncedState("", DEBOUNCE);

    // Search results
    const { searchStatus, searchResults, searchError } = useSemanticSearch({
        backend,
        workspace,
        searchTerm,
        objectTypes,
        deepSearch,
        limit,
    });

    React.useEffect(() => {
        if (searchStatus === "error") {
            // Report error to the console
            // UI will display a generic error message
            console.error(searchError);
        }
    }, [searchStatus, searchError]);

    return (
        <div className="gd-semantic-search__overlay">
            <Input
                className="gd-semantic-search__overlay-input"
                autofocus
                placeholder={intl.formatMessage({ id: "semantic-search.placeholder" })}
                isSearch
                clearOnEsc
                value={value}
                onChange={(e) => setValue(String(e))}
            />
            {(() => {
                switch (searchStatus) {
                    case "loading":
                        return <LoadingMask width={SEARCH_OVERLAY_WIDTH} height={LOADING_HEIGHT} />;
                    case "error":
                        return (
                            <div className="gd-semantic-search__overlay-error">
                                <FormattedMessage id="semantic-search.error" />
                            </div>
                        );
                    case "success":
                        if (!searchResults.length) {
                            return (
                                <div className="gd-semantic-search__overlay-no-results">
                                    <FormattedMessage
                                        id="semantic-search.no-results"
                                        values={{ query: searchTerm }}
                                    />
                                </div>
                            );
                        }

                        return (
                            <SearchResultsList
                                searchResults={searchResults}
                                width={SEARCH_OVERLAY_WIDTH}
                                onSelect={onSelect}
                            />
                        );
                    case "idle":
                    default:
                        return null;
                }
            })()}
        </div>
    );
};