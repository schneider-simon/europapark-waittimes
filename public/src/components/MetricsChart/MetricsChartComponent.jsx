import React from "react";

export default class MetricsChartComponent extends React.Component {
    componentDidMount(){
        this.props.draw();
    }
    
    render(){
        return (
            <div id={this.props.id}>
            </div>
        );
    }
}
