// (C) 2022 GoodData Corporation

import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IAttributeFilter } from "@gooddata/sdk-model";
import { useEffect, useState } from "react";

export interface IUseAttributeFilterSelectionProps {
    backend?: IAnalyticalBackend;
    workspace?: string;
    filter?: IAttributeFilter;
}

export const useAttributeFilterSelection = (props: IUseAttributeFilterSelectionProps) => {
    const { backend, workspace, filter } = props;
    const [result, setResult] = useState("loading");

    useEffect(() => {
        const fetchElements = async () =>
            backend.workspace(workspace).attributes().elements().forFilter(filter).query();
        const res = fetchElements();
        res.then((value) => {
            const titles = value.items.map((item) => item.title);
            const subTitle = titles.join(",");
            setResult(subTitle);
        }).catch(() => {
            setResult("error");
        });
    }, [backend, workspace, filter, setResult]);

    return result;
};
