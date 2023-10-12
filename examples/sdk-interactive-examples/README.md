# GoodData.UI SDK - Interactive Examples

Here are basic usage examples of [GoodData.UI](https://github.com/gooddata/gooddata-ui-sdk).

> Please note that these Interactive Examples work well in all major browsers (Firefox, Chrome, Safari, …) except for [Brave](https://brave.com/).

## List of Examples

* Headline - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-headline?file=/src/App/index.js)
* ComboChart - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-combochart?file=/src/App/index.js)
* RelativeDateFilter - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-relativedatefilter?file=/src/App/index.js)
* ChartConfig - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-chartconfig?file=/src/App/index.js)
* PivotTable - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-pivottable?file=/src/App/index.js)
* InsightView - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-insightview?file=/src/App/index.js)
* DashboardView - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-dashboardview?file=/src/App/index.js)
* Execute - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-execute?file=/src/App/index.js)
* Year Filter - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-yearfilter?file=/src/App/index.js)
* AttributeFilter - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-attributefilter?file=/src/App/index.js)
* Custom Attribute Filter - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-customattributefilter?file=/src/App/index.js)
* Granularity - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-granularity?file=/src/App/index.js)
* DateFilter - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-datefilter?file=/src/App/index.js)
* ColumnChart - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-columnchart?file=/src/App/index.js)
* Measure Value Filter - [open in CodeSandbox](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-measurevaluefilter?file=/src/App/index.js)

## Running Examples in CodeSandbox using GitHubBox

An easy way to open an example in [CodeSandbox](https://codesandbox.io/) via URL is with [GitHubBox.com](https://github.com/dferber90/githubbox). Append 'box' to the github.com URL in between 'hub' and '.com' and it will redirect to CodeSandbox. Here's an example:

Change the GitHub URL:\
https://github.com/gooddata/gooddata-ui-examples/tree/master/example-headline.

To:\
https://githubbox.com/gooddata/gooddata-ui-examples/tree/master/example-headline.

[![Headline](assets/example-codesandbox-headline.png)](https://codesandbox.io/s/github/gooddata/gooddata-ui-examples/tree/master/example-headline?file=/src/App/index.js)

## Running Examples locally 

Clone whole SDK 1) 
You can also run any example on your localhost.

1. `git clone git@github.com:gooddata/gooddata-ui-examples.git`
1. `cd gooddata-ui-examples/example-headline`
1. `yarn install`
1. `yarn start`

Clone just example directory.  

## Upgrading GoodData.UI SDK in all examples at once

TODO: Describe monorepo upgrade is for free because it works on workspaces

TODO: SCRIP not valid: 

To bump GoodData.UI SDK to the latest version in all the examples at once, you can run the script:

```bash
./scripts/bump-sdk.sh
```

This will upgrade all `@gooddata` packages in all the `example-*` folders. This can take several minutes, so be patient.

## Troubleshooting



## License

(C) 2017-2021 GoodData Corporation

This repository is under the GoodData commercial license available in the [LICENSE](LICENSE) file because it contains a commercial package, HighCharts.