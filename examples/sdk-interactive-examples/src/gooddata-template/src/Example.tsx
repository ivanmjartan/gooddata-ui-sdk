// (C) 2021 GoodData Corporation
import React, { useState } from "react";
import { Treemap } from "@gooddata/sdk-ui-charts";
import { AttributeFilter } from "@gooddata/sdk-ui-filters";
import { IAttributeFilter, newNegativeAttributeFilter } from "@gooddata/sdk-model";
import * as Catalog from "./catalog.js";
import Hint from "./Hint.js";

export default () => {  
  const [filter, setFilter] = useState<IAttributeFilter>(newNegativeAttributeFilter(Catalog.ProductName, []));
  return (
    <>
      <h1>Attribute Filter Component</h1>

      <div style={{ margin: 10 }}>
        <AttributeFilter
          filter={filter}
          onApply={(filter) => setFilter(filter)}
        />
      </div>

      <div style={{ height: 300 }}>
        <Treemap
          measures={[Catalog.Revenue]}
          viewBy={Catalog.ProductName}
          segmentBy={Catalog.Region}
          filters={[filter]}
          config={{ legend: { enabled: false } }}
        />
      </div>

      <Hint />
    </>
  );
};
