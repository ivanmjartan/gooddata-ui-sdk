// (C) 2007-2018 GoodData Corporation
import React from "react";
import Measure, { MeasuredComponentProps } from "react-measure";

const MEASURED_ELEMENT_STYLE = { width: "100%", height: "100%" };
export class HighChartsMeasuredRenderer extends React.PureComponent {
    private renderChildren(contentRect: any) {
        return React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, { contentRect });
            }
            return child;
        });
    }

    public render(): React.ReactNode {
        return (
            <Measure client={true}>
                {({ measureRef, contentRect }: MeasuredComponentProps) => {
                    return (
                        <div
                            className="visualization-container-measure-wrap"
                            style={MEASURED_ELEMENT_STYLE}
                            ref={measureRef}
                        >
                            {this.renderChildren(contentRect)}
                        </div>
                    );
                }}
            </Measure>
        );
    }
}
